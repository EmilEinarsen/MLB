import React from 'react'
import useBoolean from 'bjork_react-hookup/core/useBoolean'
import Collection from './Collection'

const CollectionContainer = ({ 
    collection, 
    props: {
        checked,
        handleCheck,
        setSelectedFile,
        secondary,
        content
    }
}: { 
    collection: Collection
    props: {
        checked: string[]
        handleCheck: (value: string) => void
		setSelectedFile: (value: string) => void
        secondary: boolean
        content: boolean
    }
}) => {
    const [ open, , { toggle: toggleOpen } ] = useBoolean()
    
    return <Collection
        collection={collection}
        open={open}
        onClick={toggleOpen}
        props={{
            checked,
            handleCheck,
            setSelectedFile,
            secondary,
            content
        }}
    />
}

export default CollectionContainer