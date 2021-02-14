import React, { useEffect } from 'react'
import useBoolean from 'bjork_react-hookup/core/useBoolean'
import Collection from './Collection'

interface Props {
	collection: Collection
	configuration: any
}

const CollectionContainer: React.FC<Props> = ({ 
    collection, 
    configuration
}) => {
    const [ open, , { toggle: toggleOpen, setFalse: close } ] = useBoolean()

	useEffect(() => !collection.docs?.length && close())
    
    return <Collection {...{collection, configuration, open, onClick: toggleOpen}} />
}

export default CollectionContainer