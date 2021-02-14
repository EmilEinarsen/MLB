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
	props: { 
		refMounted: any 
	}
}

const ListContainer: React.FC<Props> = ({ 
	list,
	configuration,
	props: {
		refMounted
	}
}) => {
	const {
		collections,
		hooks: {
			check: { checked, addCheck, removeCheckByValue },
			file: { selectedFile, setSelectedFile },
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
				selectedFile,
				setSelectedFile,
				refMounted
			}}
		/>
	)
}

export default ListContainer