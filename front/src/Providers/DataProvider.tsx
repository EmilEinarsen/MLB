/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { createContext, useContext, useState, useEffect } from "react"
import serverData from './serverData'
import useArray from 'bjork_react-hookup/core/useArray'
import { contextPage, navigation } from "./PageProvider"
import useMediaQuery from "../Hooks/useMediaQuery"
import { ACTION, fetchServer } from "../Hooks/useServer"
import useAsync from "../Hooks/useAsync"
import { useStorage } from 'bjork_react-hookup'
import useHistory from "../Hooks/useHistory/useHistory"
import PATH from "../Hooks/useHistory/PATH"

declare global {
	interface ContextData {
		collections: Collection[]
		files: Doc[]
		user: { username: string }
		hooks: {
			check: { checked: string[], addCheck: (value: string) => void, removeCheckByValue: (value: string) => void, clearChecked: () => void },
			file: { selectedFile: string | undefined, setSelectedFile: (value: string) => void }
			collection: { selectedCollection: string | undefined, setSelectedCollection: (value: string) => void }
		}
		reload: () => void
		rerender: () => void
	}
}

export const contextData = createContext<ContextData | undefined>(undefined)

const getSongId = (current: string) =>
	current === PATH.USER ? ''
	: current.split('/').pop()


const FilesProvider = ({ children }: any) => {
	const history = useHistory()

	const [ data, setData ] = useState<Data>(serverData)
	const [ response, serverRequest, { reset: resetResponse } ] = useAsync(async () => await fetchServer({ dest: ACTION.get_all }), false)
	const rerender = () => setData({ ...serverData })

	const [ checked, , { 
		add: addCheck,
		removeByValue: removeCheckByValue,
		clear: clearChecked
	}] = useArray([])
	
	const matches = useMediaQuery({})
	const [ selectedFile, setSelectedFile ] = useState(getSongId(history.current))
	const handleSetSelectedFile = (value: any) => {
		setSelectedFile(value)
		!matches 
			? history.push(PATH.PLAYLIST.replace(':songId', value))
			: history.push(PATH.SONG.replace(':songId', value))
	}
	useEffect(() => {
		const id = getSongId(history.current)
		id && setSelectedFile(id)
	}, [history.current])
	
	const [ selectedCollection, setSelectedCollection ] = useState<string | undefined>()


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
			user: { username: data.username },
			hooks: {
				check: { checked, addCheck, removeCheckByValue, clearChecked },
				file: { 
					selectedFile, 
					setSelectedFile: handleSetSelectedFile
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