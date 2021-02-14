/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { createContext, ReactNode, useContext, useState, useEffect } from "react"
import serverData from './serverData'
import useArray from 'bjork_react-hookup/core/useArray'
import { contextPage, navigation } from "./PageProvider"
import useMediaQuery from "../Hooks/useMediaQuery"
import useServer, { ACTION, fetchServer } from "../Hooks/useServer"
import useAsync from "../Hooks/useAsync"
import { useStorage } from 'bjork_react-hookup'

declare global {
	interface ContextData {
		collections: Collection[],
		files: Doc[],
		hooks: {
			check: { checked: string[], addCheck: (value: string) => void, removeCheckByValue: (value: string) => void, clearChecked: () => void },
			file: { selectedFile: string | undefined, setSelectedFile: (value: string) => void }
			collection: { selectedCollection: string | undefined, setSelectedCollection: (value: string) => void }
		},
		reload: () => void
		rerender: () => void
	}
}

export const contextData = createContext<ContextData | undefined>(undefined)

const FilesProvider = (
	{ children }: { children: ReactNode }
) => {
	const { setPage } = useContext(contextPage)
	const [ data, setData ] = useState<Data>(serverData)
	const [ response, serverRequest, { reset: resetResponse } ] = useAsync(async () => await fetchServer({ dest: ACTION.get_all }), false)

	const [ checked, , { 
		add: addCheck,
		removeByValue: removeCheckByValue,
		clear: clearChecked
	}] = useArray([])
	
	const [ selectedFile, setSelectedFile ] = useStorage('local', 'selectedFile')

	const [ selectedCollection, setSelectedCollection ] = useState<string | undefined>()
	
	const matches = useMediaQuery({})

	const rerender = () => setData({ ...serverData })

	useEffect(() => {
		if(response.pending) return
		response.value && (
			(serverData.docs = response.value.docs),
			(serverData.collections = response.value.collections),
			resetResponse(),
			rerender()
		)
		response.error && (
			resetResponse()
		)
	}, [resetResponse, response])

	return (
		<contextData.Provider value={{ 
			files: data.docs,
			collections: data.collections,
			hooks: {
				check: { checked, addCheck, removeCheckByValue, clearChecked },
				file: { 
					selectedFile, 
					setSelectedFile: (value) => {
						setSelectedFile(value)
						
						matches && setPage(navigation.selected)
					}
				},
				collection: {
					selectedCollection, 
					setSelectedCollection
				}
			},
			reload: serverRequest,
			rerender
		}}>
			{children}
		</contextData.Provider>
	)
}

export default FilesProvider