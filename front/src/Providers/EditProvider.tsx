import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Modal } from 'antd'
import { contextFiles } from './FilesProvider'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ModalEditor from '../App/components/ModalEditor'

export enum modalModes {
    'add',
	'edit',
    'remove',
    'remove_mult',
    'none'
}

interface ContextEdit {
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
    file: undefined | Doc
    change: ({ type, id, payload }: { type: modalModes, id: string, payload: object }) => void
    reset: () => void
    id: string,
    reload: () => void
}

export const contextEdit = createContext<ContextEdit | undefined>(undefined)

const EditProvider = (
    { children }: { children: ReactNode }
) => {
    const {
        files,
        hooks: {
            check: { checked },
            file: { selectedFile } 
        },
        change,
        reload
    }: any = useContext(contextFiles)

    const [ mode, setMode ] = useState<modalModes>(modalModes.none)
    const [ update, setUpdate ] = useState<any>({})
    
    const reset = () => setMode(modalModes.none)

    useEffect(() => {
        selectedFile && mode === modalModes.remove && showDelete({ 
            change: () => (reset(), change({ type: modalModes.remove, id: selectedFile })), 
            reset, fileNames: files.filter((doc: Doc) => checked.includes(doc.id)).map((doc: Doc) => doc.title)
        })
        checked.length && mode === modalModes.remove_mult && showDelete({ 
            change: () => (reset(), change({ type: modalModes.remove, ids: checked })),
            reset, fileNames: files.filter((doc: Doc) => checked.includes(doc.id)).map((doc: Doc) => doc.title)
        })
    }, [ mode ])

    useEffect(() => {
        if(mode !== modalModes.edit && mode !== modalModes.add) return
        change({ type: mode, id: selectedFile, payload: update })
        reset()
    }, [ update ])

    

    return (
        <contextEdit.Provider value={{
            hooks: { 
                modal: { mode, setMode },
                update: { update, setUpdate }
            },
            file: mode !== modalModes.add ? files.find((file: Doc) => file.id === selectedFile) : undefined,
            change,
            reset,
            id: selectedFile,
            reload
        }}>
            { children }
            <ModalEditor />
        </contextEdit.Provider>
    )
}

function showDelete({ reset, change, mult, fileNames }: any) {
    Modal.confirm({
        title: fileNames.length !== 1
            ? `Are you sure you want to delete these files?` 
            : 'Are you sure you want to delete this file?'
        ,
        content: fileNames.length !== 1 
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
