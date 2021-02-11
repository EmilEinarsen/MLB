import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Modal } from 'antd'
import { contextData } from './DataProvider'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ModalEditor from '../App/components/ModalEditor'
import { ACTION } from '../Hooks/useServer'
import { APPEARANCE } from '../App/components/ModalEditor/ModalEditor'

export enum modalModes {
	'add_collection',
	'add_doc',
	'edit',
    'remove',
    'remove_mult',
    'none'
}

interface ContextEdit {
    file?: Doc
    files?: Doc[]
    collection?: Collection
    hooks: {
        modal: {
            mode: modalModes, 
            setMode: React.Dispatch<React.SetStateAction<modalModes>>
        },
        update: {
            update: modalModes, 
            setUpdate: React.Dispatch<React.SetStateAction<modalModes>>
        }
    }
    handleSetCollection: (id: string) => void
    change: ({ type, id, payload }: { type: modalModes, id: string, payload: object }) => void
    reset: () => void
    id: string
    reload: () => void
	rerender: () => void
	appearance: APPEARANCE
}

export const contextEdit = createContext<ContextEdit | undefined>(undefined)

const EditProvider = (
    { children }: { children: ReactNode }
) => {
    const 
        {
            files,
            collections,
            hooks: {
                check: { checked },
                file: { selectedFile } 
            },
            change,
            reload,
            rerender
        }: any = useContext(contextData),
        [ mode, setMode ] = useState<modalModes>(modalModes.none),
        [ update, setUpdate ] = useState<any>({}),
        reset = () => setMode(modalModes.none),
        file = (mode === modalModes.edit || mode === modalModes.remove || mode === modalModes.remove_mult) ? files.find((file: Doc) => file.id === selectedFile) : undefined,
        [ collection, setCollection ] = useState<Collection | undefined>(undefined),
		request = 
			mode === modalModes.add_collection ? ACTION.COLLECTION 
				: mode === modalModes.add_doc ? ACTION.DOC 
				: mode === modalModes.remove_mult ? ACTION.DOC
				: collection ? ACTION.COLLECTION
				: file ? ACTION.DOC
				: undefined
		,
        id = collection ? collection.id : selectedFile ? selectedFile : undefined,
		handleSetCollection = (id: string) => setCollection(id ? collections.find((collection: Collection) => collection.id === id) : undefined),
		appearance = 
			mode === modalModes.edit ? 
				collection ? APPEARANCE.collection : file ? APPEARANCE.file : APPEARANCE.none
			: 
				mode === modalModes.add_collection ? APPEARANCE.collection : mode === modalModes.add_doc ? APPEARANCE.file : APPEARANCE.none

    useEffect(() => {
       	mode === modalModes.remove && showDelete({ 
            change: () => (change({ type: modalModes.remove, id, request }), reset()), 
            reset, fileNames: file ? [ file.title ] : undefined, collectionName: collection?.title
        })
        checked.length && mode === modalModes.remove_mult && showDelete({ 
            change: () => (change({ type: modalModes.remove, ids: checked, request }), reset()),
            reset, fileNames: files.filter((doc: Doc) => checked.includes(doc.id)).map((doc: Doc) => doc.title)
        })
    }, [ mode ])

    useEffect(() => {
		if(mode !== modalModes.edit && mode !== modalModes.add_collection && mode !== modalModes.add_doc) return
        change({ type: mode, id, payload: update, request })
        reset()
    }, [ update ])

    return (
        <contextEdit.Provider value={{
            file,
            files,
            collection,
            hooks: { 
                modal: { mode, setMode },
				update: { update, setUpdate }
            },
            handleSetCollection,
            change,
            reset,
            id: selectedFile,
            reload,
			rerender,
			appearance
        }}>
            { children }
            <ModalEditor />
        </contextEdit.Provider>
    )
}

function showDelete({ reset, change, fileNames, collectionName }: any) {
    Modal.confirm({
		title: 
			fileNames ? 
				fileNames.length > 1
					? `Are you sure you want to delete these files?` 
					: 'Are you sure you want to delete this file?'
			: `Are you sure you want to delete this folder?`
        ,
		content: 
			fileNames ? 
				fileNames.length > 1
					? fileNames.map((title: string, index: number) => title+(index < fileNames.length-1 ? ', ' : '')) 
					: fileNames[0]
			: collectionName
		,
        icon: <ExclamationCircleOutlined />,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: change,
        onCancel: reset
    })
}

export default EditProvider
