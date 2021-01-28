import React, { useContext, useRef, useState } from 'react'
import { ACTION, fetchServer } from '../../../Hooks/useServer'
import { contextEdit, modalModes } from '../../../Providers/EditProvider'
import ModalEditor from './ModalEditor'

const ModalEditorContainer = () => {
    const { 
        hooks: { 
            modal: { mode },
            update: { setUpdate }
        },
        file,
        reset,
        id,
        reload
    }: any = useContext(contextEdit)
    
    const 
        visible = mode === modalModes.edit || mode === modalModes.add,
        formRef = useRef<any>(),
        [ localImg, setLocalImg ] = useState<any>(file?.img ? file.img.length ? file.img : [file.img] : []),
        handleClose = reset,
        handleSave = () => {
            let 
                changedFieldsValues = formRef.current.getFieldsValue('title'),
                result: any = {}
            Object.keys(changedFieldsValues).forEach((field: string) => changedFieldsValues[field] && (result[field] = changedFieldsValues[field]))

            setUpdate(result)
        },
        handleImgUpload = async (img: any) => {
            const fmData = new FormData()
            fmData.append('image', img)
            fmData.append('id', id)
            setLocalImg([img])
            await fetchServer({ dest: ACTION.IMG.create, options: { method: 'POST', body: fmData } })
            reload()
            return false
        },
        handleImgRemove = async () => {
            setLocalImg([])
            await fetchServer({ dest: ACTION.IMG.delete, options: { method: 'POST', body: id } })
            return true
        }

    return (
        visible ? <ModalEditor
            props={{
                file,
                imgList: localImg,
                visible,
                handleClose,
                formRef,
                handleSave,
                handleImgUpload,
                handleImgRemove
            }}
        /> : <></>
    )
}

export default ModalEditorContainer
