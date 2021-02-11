import { ACTION } from "../Hooks/useServer"

declare global {
	interface Doc {
		id: string
		title: string
		subtitle?: string
		text?: string
		img?: any
		music?: string
    }
    
    interface  Collection {
        id: string
        title: string
        docs: Doc[]
	}
	
	interface Data {
		collections: Collection[],
		docs: Doc[]
	}
}

const data: Data | any = {
    collections: [],
    docs: []
}

export const createData = (req: any, payload: any) => {
	const target = data[requestToDataKey(req)]
	target.push(payload)
}

export const updateData = (req: any, id: string, payload: any) => {
    const 
        key = requestToDataKey(req),
        target = data[key].find((value: Collection | Doc) => value.id === id)
    
    Object.assign(target, payload)
    // Object assign doesn't overwrite nestedly. As a result, manuel assignment is sometimes needed
    key === 'collections' && (
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

export const deleteDocImg = (docId: string) => updateData(ACTION.DOC, docId, { img: undefined })
    

const requestToDataKey = (req: any) => req === ACTION.DOC ? 'docs' : req === ACTION.COLLECTION ? 'collections' : ''


export default data