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
	const { collections }: any = useContext(contextData)

	return (
		<List 
			{...{list, configuration, collections}}
		/>
	)
}

export default ListContainer