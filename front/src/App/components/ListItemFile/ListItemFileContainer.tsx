import React, { useContext } from 'react'
import { contextData } from '../../../Providers/DataProvider'
import ListItemFile from './ListItemFile'

interface Props {
	configuration: any
	className?: any
	file: Doc
}

const ListItemFileContainer: React.FC<Props> = ({
	configuration,
	className,
	file
}) => {
	const {
		hooks: {
			check: { checked, addCheck, removeCheckByValue },
			file: { selectedFile, setSelectedFile }
		}
	}: any = useContext(contextData)

	const handleCheck = (id: string) =>
		checked.includes(id)
			? removeCheckByValue(id)
			: addCheck(id)

	return <ListItemFile 
		{...{configuration, className, file}}
		props={{ checked, handleCheck, selectedFile, setSelectedFile }}
	/>
}

export default ListItemFileContainer
