import React, { useContext } from 'react'
import { contextData } from '../../../Providers/DataProvider'
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
	const {
		collections,
		hooks: {
			check: { checked, addCheck, removeCheckByValue },
			file: { setSelectedFile },
		}
	}: any = useContext(contextData)

	const handleCheck = (id: string) =>
		checked.includes(id)
			? removeCheckByValue(id)
			: addCheck(id)

	return (
		<List 
			configuration={configuration}
			collections={collections}
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