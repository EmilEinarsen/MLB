import React, { useContext } from 'react'
import { contextFiles } from '../../../Providers/FilesProvider'
import List from './List'

interface Props {
	list: { [key: string]: Doc[] },
	configuration: {
		dense: boolean,
		secondary: boolean,
		content: boolean
	}
}

const ListContainer: React.FC<Props> = ({ 
	list,
	configuration
}) => {
	const { hooks: {
		check: { checked, addCheck, removeCheckByValue },
		file: { setSelectedFile }
	}}: any = useContext(contextFiles)

	const handleCheck = (id: string) =>
		checked.includes(id)
			? removeCheckByValue(id)
			: addCheck(id)

	return (
		<List 
			configuration={configuration} 
			list={list}
			props={{
				checked,
				handleCheck,
				setSelectedFile
			}}
		/>
	)
}

export default ListContainer