/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { createContext, ReactNode, useContext, useState, useEffect } from "react"
import serverData, { createData, deleteData, updateData } from './serverData'
import useArray from 'bjork_react-hookup/core/useArray'
import { contextPage, navigation } from "./PageProvider"
import useMediaQuery from "../Hooks/useMediaQuery"
import { modalModes } from "./EditProvider"
import useServer, { ACTION, fetchServer } from "../Hooks/useServer"

declare global {
	interface ContextData {
		collections: Collection[],
		files: Doc[],
		hooks: {
			check: { checked: string[], addCheck: (value: string) => void, removeCheckByValue: (value: string) => void },
			file: { selectedFile: string | undefined, setSelectedFile: (value: string) => void }
		},
		change: ({ type, id, payload }: { type: modalModes, id: string, payload: object }) => void
		reload: () => void
		rerender: () => void
	}
}

export const contextData = createContext<ContextData | undefined>(undefined)

const addData = async ({ payload, rerender, request }: { payload: object, rerender: () => void, request: any }) => {
	const res = await fetchServer({ dest: request.create, payload })
	res && (createData(request, res), rerender())
}

const editData = async ({ id, payload, rerender, request }: { id: string, payload: any, rerender: () => void, request: any }) => {
	let 
		{ img, ...subPayload } = payload,
		response = await fetchServer({
			dest: request.update,
			payload: img ? { id, ...subPayload, imgUid: img.uid } : { id, ...payload }
		})
	;response && (updateData(request, id, img ? { ...subPayload, img } : payload), rerender())
}
const removeData = async ({ id, ids, rerender, request }: { id?: string, ids?: string[], rerender: () => void, request: any }) => 
	await fetchServer({ dest: request.delete, payload: { id, ids } })
		&& (deleteData(request, { id, ids }), rerender())

const FilesProvider = (
	{ children }: { children: ReactNode }
) => {
	const { setPage } = useContext(contextPage)
	const [ data, setData ] = useState<Data>(serverData)
	const [ response, serverRequest ] = useServer(ACTION.get_all, undefined, false)

	const [ checked, , { 
		add: addCheck,
		removeByValue: removeCheckByValue 
	}] = useArray([])
	
	const [ selectedFile, setSelectedFile ] = useState<string | undefined>()
	
	const matches = useMediaQuery({})

	const rerender = () => setData({ ...serverData })

	useEffect(() => {
		if(response.pending) return
		
		response.value && response.value && (
			(data.docs = response.value.docs),
			(data.collections = response.value.collections),
			rerender()
		)

	}, [response])

	return (
		<contextData.Provider value={{ 
			files: data.docs,
			collections: data.collections,
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
			change: ({ type, request, ...rest }: any) => {
				type === modalModes.edit && editData({ rerender, request, ...rest })
				type === modalModes.remove && removeData({ rerender, request, ...rest })
				type === modalModes.remove_mult && removeData({ rerender, request, ...rest })
				;(type === modalModes.add_collection || type === modalModes.add_doc) && addData({ rerender, request, ...rest })
			},
			reload: serverRequest,
			rerender
		}}>
			{children}
		</contextData.Provider>
	)
}

export default FilesProvider