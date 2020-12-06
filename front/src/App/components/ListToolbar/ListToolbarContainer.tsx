import React from 'react'
import ListToolbar from './ListToolbar'
import useBoolean from 'bjork_react-hookup/core/useBoolean'

const ListToolbarContainer = ({ props }: { props: any }) => {
	const [ drawer, , { setFalse, setTrue } ] = useBoolean(undefined)
	
	return <ListToolbar props={{ drawer, setFalse, setTrue, ...props }} />
}

export default ListToolbarContainer
