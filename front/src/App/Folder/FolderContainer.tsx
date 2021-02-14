import React, { useContext, useState } from 'react'
import Folder from './Folder'
import useBoolean from 'bjork_react-hookup/core/useBoolean'
import { contextAuth } from '../../Providers/AuthProvider'
import { contextData } from '../../Providers/DataProvider'

const FolderContainer: React.FC = () => {
	const { refMounted }: any = useContext(contextAuth)
	const { files, hooks: { file: { selectedFile } }, reload }: any = useContext(contextData)
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
		setListContainer,
		refMounted,
		reload
	}} />
}

export default FolderContainer
