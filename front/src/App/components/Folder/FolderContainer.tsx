import React, { useContext, useState } from 'react'
import Folder from './Folder'
import useBoolean from 'bjork_react-hookup/core/useBoolean'
import { contextEdit, modalModes } from '../../../Providers/EditProvider'

interface Props {
	props: {
		files: Doc[],
		selectedFile: string
		isMounted: any
		reload: () => void
	}
}

const FolderContainer: React.FC<Props> = ({
	props: {
		files,
		selectedFile,
		isMounted,
		reload
	}
}) => {
	const 
		[ dense, , { toggle: toggleDense } ] = useBoolean(),
		[ secondary, , { toggle: toggleSecondary } ] = useBoolean(),
		[ content, , { toggle: toggleContent } ] = useBoolean(),
		[ listContainer, setListContainer ] = useState<HTMLElement | null>(null),
		{ hooks: { modal: { setMode } } }: any = useContext(contextEdit),
		addDoc = () => setMode(modalModes.add),
		editDoc = () => setMode(modalModes.edit)

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
		addDoc,
		editDoc,
		isMounted,
		reload
	}} />
}

export default FolderContainer
