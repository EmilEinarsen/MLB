import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Modal } from 'antd'
import { contextData } from './DataProvider'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ModalEditor from '../App/components/ModalEditor'
import { ACTION } from '../Hooks/useServer'

export enum modalModes {
    'add',
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
        file = mode !== modalModes.add ? files.find((file: Doc) => file.id === selectedFile) : undefined,
        [ collection, setCollection ] = useState<Collection | undefined>(undefined),
        request = file ? ACTION.DOC : collection ? ACTION.COLLECTION : undefined,
        id = selectedFile ? selectedFile : collection ? collection.id : undefined,
        handleSetCollection = (id: string) => setCollection(collections.find((collection: Collection) => collection.id === id))

    useEffect(() => {
        selectedFile && mode === modalModes.remove && showDelete({ 
            change: () => (reset(), change({ type: modalModes.remove, id: selectedFile, request })), 
            reset, fileNames: [ file.title ]
        })
        checked.length && mode === modalModes.remove_mult && showDelete({ 
            change: () => (reset(), change({ type: modalModes.remove, ids: checked, request })),
            reset, fileNames: files.filter((doc: Doc) => checked.includes(doc.id)).map((doc: Doc) => doc.title)
        })
    }, [ mode ])

    useEffect(() => {
        if(mode !== modalModes.edit && mode !== modalModes.add) return
        console.log(id)
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
            rerender
        }}>
            { children }
            <ModalEditor />
        </contextEdit.Provider>
    )
}

function showDelete({ reset, change, fileNames }: any) {
    Modal.confirm({
        title: fileNames.length > 1
            ? `Are you sure you want to delete these files?` 
            : 'Are you sure you want to delete this file?'
        ,
        content: fileNames.length > 1
            ? fileNames.map((title: string, index: number) => title+(index < fileNames.length-1 ? ', ' : '')) 
            : fileNames[0],
        icon: <ExclamationCircleOutlined />,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: change,
        onCancel: reset
    })
}

export default EditProvider
