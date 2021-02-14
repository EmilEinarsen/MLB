import { ACTION } from "../Hooks/useServer"

declare global {
	interface Doc {
		id: string
		title: string
		subtitle?: string
		text?: string
		img?: any
		music?: any
    }
    
    interface  Collection {
        id: string
        title: string
        docs: Doc[]
	}
	
	interface Data {
		id: string
		email: string
		username: string
		collections: Collection[]
		docs: Doc[]
	}
}

const data: Data | any = {
	id: '',
	email: '',
	username: '',
    collections: [],
    docs: []
}

export const clearData = () => {
	data.id = ''
	data.email = ''
	data.username = ''
    data.collections = []
    data.docs = []
}
export const createData = (req: any, payload: any) =>
	payload.length ?
		data[requestToDataKey(req)].push(...payload) : 
		data[requestToDataKey(req)].push(payload)


export const updateData = (req: any, id: string, payload: any) => {
    const 
        key = requestToDataKey(req),
        target = data[key].find((value: Collection | Doc) => value.id === id)
    
    Object.assign(target, payload)
    // Object assign doesn't overwrite nestedly. As a result, manuel assignment is sometimes needed
    key === 'collections' && payload.docIds && (
		target.docs = payload.docIds.map((id: string) => data.docs.find((doc: Doc)=>doc.id===id))
	)
}

export const deleteData = (req: any, { id, ids }: { id?: string, ids?: string[] }) => {
	const
		key = requestToDataKey(req),
		target = data[key]

	data[key] = target.filter(
		(value: Collection | Doc) => id ? value.id !== id : ids ? !ids.includes(value.id) : true
	)

	// Delete doc from any collection
	key === 'docs' && data.collections.forEach(
		(collection: Collection) =>
			id ?
				collection.docs?.find((doc: Doc) => doc.id === id) && (
					collection.docs = collection.docs.filter((doc: Doc) => doc.id !== id)
				)
			: 
				ids?.forEach(id=>collection.docs?.find((doc: Doc) => doc.id === id) && (
					collection.docs = collection.docs.filter((doc: Doc) => doc.id !== id)
				))
	)
}

export const deleteDocFile = (docId: string, key: string) => updateData(ACTION.DOC, docId, { [key]: undefined })
    

const requestToDataKey = (req: any) => req === ACTION.DOC ? 'docs' : req === ACTION.COLLECTION ? 'collections' : ''


export default data