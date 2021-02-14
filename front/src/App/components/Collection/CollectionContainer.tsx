import React, { useEffect } from 'react'
import useBoolean from 'bjork_react-hookup/core/useBoolean'
import Collection from './Collection'

const CollectionContainer = ({ 
    collection, 
    props: {
        checked,
        handleCheck,
		selectedFile,
        setSelectedFile,
        secondary,
        content
    }
}: { 
    collection: Collection
    props: {
        checked: string[]
        handleCheck: (value: string) => void
		selectedFile: string
		setSelectedFile: (value: string) => void
        secondary: boolean
        content: boolean
    }
}) => {
    const [ open, , { toggle: toggleOpen, setFalse: close } ] = useBoolean()

	useEffect(() => !collection.docs?.length && close())
    
    return <Collection
        collection={collection}
        open={open}
        onClick={toggleOpen}
        props={{
            checked,
            handleCheck,
			selectedFile,
            setSelectedFile,
            secondary,
            content
        }}
    />
}

export default CollectionContainer