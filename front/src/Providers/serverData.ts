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
}

interface Data {
    collections: Collection[],
    docs: Doc[]
}

const data: Data | any = {
    collections: [],
    docs: []
}



export const addDoc = (doc: Doc) => data.docs.push(doc)

export const updateDoc = (id: string, payload: object) => Object.assign(data.docs[data.docs.findIndex((doc: any) => doc.id === id)], payload)

export const removeDoc = ({ id, ids }: { id?: string, ids?: string[] }) => data.docs = data.docs.filter((doc: Doc) => id ? doc.id !== id : ids ? !ids.includes(doc.id) : true)

export const removeDocImg = (docId: string) => updateDoc(docId, { img: undefined })

export const updateData = (req: any, id: string, payload: any) => {
    const 
        key = requestToDataKey(req),
        target = data[key].find((value: Collection | Doc) => value.id === id)
    
    Object.assign(target, payload)

    // Object assign doesn't overwrite nestedly. As a result, manuel assignment is sometimes needed
    key === 'collections' && (target.docs = payload.docIds.map((id: string)=>data.docs.find((doc: Doc)=>doc.id===id)))
}
    

const requestToDataKey = (req: any) => req === ACTION.DOC ? 'docs' : req === ACTION.COLLECTION ? 'collections' : ''


export default data