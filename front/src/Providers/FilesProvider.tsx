import React, { createContext, Dispatch, ReactNode, useContext, useState, useEffect } from "react"
import data from './serverData'
import useArray from 'bjork_react-hookup/core/useArray'
import { contextPage, navigation } from "./PageProvider"
import useMediaQuery from "../Hooks/useMediaQuery"
import { modalModes } from "./EditProvider"
import useServer, { ACTION, fetchServer } from "../Hooks/useServer"
import { cleanByKeys } from "../Helpers/Helpers"


declare global {
	interface ContextFilesData {
		files: Doc[],
		hooks: {
			check: { checked: string[], addCheck: (value: string) => void, removeCheckByValue: (value: string) => void },
			file: { selectedFile: string | undefined, setSelectedFile: (value: string) => void }
		},
		change: ({ type, id, payload }: { type: modalModes, id: string, payload: object }) => void
		reload: () => void
	}
}

export const contextFiles = createContext<ContextFilesData | undefined>(undefined)

const addFile = async ({ payload, rerender }: { payload: object, rerender: Dispatch<any> }) => {
	let doc = await fetchServer({ dest: ACTION.DOC.create, payload })
	// eslint-disable-next-line @typescript-eslint/no-unused-expressions
	doc && (data.docs.push(doc), rerender([ ...data.docs ]))
}

const editFile = async ({ id, payload, rerender, options }: { id: string, payload: object, options: object, rerender: Dispatch<any> }) =>(console.log(payload),
	await fetchServer({
		dest: ACTION.DOC.update,
		payload: { id, ...payload }
	}) && (Object.assign(data.docs[data.docs.findIndex((doc: any) => doc.id === id)], payload), rerender([ ...data.docs ])))

const removeFile = async ({ id, ids, rerender }: { id?: string, ids?: string[], rerender: Dispatch<any> }) => 
	await fetchServer({ dest: ACTION.DOC.delete, payload: { id, ids } })
		&& (data.docs = data.docs.filter((doc: Doc) => id ? doc.id !== id : ids ? !ids.includes(doc.id) : true), rerender([ ...data.docs ]))

const FilesProvider = (
	{ children }: { children: ReactNode }
) => {
	const { setPage } = useContext(contextPage)
	const [ files, setFiles ] = useState<any>(data.docs)
	const [ response, serverRequest ] = useServer(ACTION.DOC.get_all, undefined, false)

	const [ checked, , { 
		add: addCheck,
		removeByValue: removeCheckByValue 
	}] = useArray([])
	
	const [ selectedFile, setSelectedFile ] = useState<string | undefined>()
	
	const matches = useMediaQuery({})

	useEffect(() => {
		if(response.pending) return
		console.log(response)
		
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		response.value && response.value.length && ((data.docs = response.value), setFiles(data.docs))
	}, [response])

	return (
		<contextFiles.Provider value={{ 
			files, 
			hooks: {
				check: { checked, addCheck, removeCheckByValue },
				file: { 
					selectedFile, 
					setSelectedFile: (value) => {
						setSelectedFile(value)
						
						matches && setPage(navigation.selected)
					}
				}
			},
			change: ({ type, ...rest }: any) => {
				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
				type === modalModes.edit && editFile({ rerender: setFiles, ...rest }),
				type === modalModes.remove && removeFile({ rerender: setFiles, ...rest }),
				type === modalModes.remove_mult && removeFile({ rerender: setFiles, ...rest }),
				type === modalModes.add && addFile({ rerender: setFiles, ...rest })
			},
			reload: serverRequest
		}}>
			{children}
		</contextFiles.Provider>
	)
}

export default FilesProvider