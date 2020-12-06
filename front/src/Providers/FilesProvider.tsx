import React, { createContext, ReactNode, useState } from "react"
import fakeData from './fakeData'
import useArray from 'bjork_react-hookup/core/useArray'

declare global {
	interface ContextFilesData {
		files: Doc[],
		hooks: {
			check: { checked: string[], addCheck: (value: string) => void, removeCheckByValue: (value: string) => void },
			file: { selectedFile: string | undefined, setSelectedFile: (value: string) => void }
		}
	}
}

export const contextFiles = createContext<ContextFilesData | undefined>(undefined)

const FilesProvider = (
	{ children }: { children: ReactNode }
) => {
	const [ checked, , { 
		add: addCheck, 
		removeByValue: removeCheckByValue 
	}] = useArray([])
	const [ selectedFile, setSelectedFile ] = useState<string | undefined>()

	console.log(selectedFile)

	return (
		<contextFiles.Provider value={{ 
			files: fakeData.files, 
			hooks: {
				check: { checked, addCheck, removeCheckByValue },
				file: { selectedFile, setSelectedFile }
			}
		}}>
			{children}
		</contextFiles.Provider>
	)
}

export default FilesProvider