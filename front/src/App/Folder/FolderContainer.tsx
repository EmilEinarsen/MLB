import React, { useContext, useState } from 'react'
import { contextData } from '../../Providers/DataProvider'
import Folder from './Folder'
import useBoolean from 'bjork_react-hookup/core/useBoolean'

const FolderContainer: React.FC = () => {
	const { files, reload }: any = useContext(contextData)
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
		listContainer,
		setListContainer,
		reload
	}} />
}

export default FolderContainer
