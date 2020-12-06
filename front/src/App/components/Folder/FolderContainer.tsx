import React, { useContext, useState } from 'react'
import Folder from './Folder'
import { contextFiles } from '../../../Providers/FilesProvider'
import useBoolean from 'bjork_react-hookup/core/useBoolean'

const FolderContainer = () => {
	const { files, hooks: { file: { selectedFile } } }: any = useContext(contextFiles)
	const [ dense, , { toggle: toggleDense } ] = useBoolean()
	const [ secondary, , { toggle: toggleSecondary } ] = useBoolean()
	const [ content, , { toggle: toggleContent } ] = useBoolean()
	const [ listContainer, setListContainer ] = useState<HTMLElement | null>(null)
	

	return <Folder props={{ 
		files, 
		dense, 
		toggleDense, 
		secondary, 
		toggleSecondary, 
		content, 
		toggleContent,
		selectedFile,
		listContainer,
		setListContainer
	}} />
}

export default FolderContainer
