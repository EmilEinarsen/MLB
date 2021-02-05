import React, { useContext, useEffect, useRef, useState } from 'react'
import { ACTION, fetchServer } from '../../../Hooks/useServer'
import { contextEdit, modalModes } from '../../../Providers/EditProvider'
import { removeDocImg } from '../../../Providers/serverData'
import ModalEditor from './ModalEditor'

const ModalEditorContainer = () => {
    const { 
        collection,
        file,
        files,
        hooks: { 
            modal: { mode },
            update: { setUpdate }
        },
        reset,
        id,
        rerender
    }: any = useContext(contextEdit)

    const 
        visible = mode === modalModes.edit || mode === modalModes.add,
        formRef = useRef<any>(),
        [ localImg, setLocalImg ] = useState<any>(file?.img ? [file.img] : []),
        [ selectedDocs, setSelectedDocs ] = useState<undefined | string[]>(undefined),
        handleClose = reset,
        handleSave = async () => {
            let 
                changedFieldsValues = formRef.current.getFieldsValue('title'),
                result: any = {}
            Object.keys(changedFieldsValues).forEach((field: string) => changedFieldsValues[field] && (result[field] = changedFieldsValues[field]))
            console.log(selectedDocs)
            selectedDocs && collection && (result.docIds = selectedDocs)

            if(file) {
                file.img && !localImg.length && handleImgRemove()
                ;(
                    (!file.img && localImg.length)
                    || (file.img && localImg.length && file.img.uid !== localImg[0].uid)
                ) && (result.img = await handleImgUpload())
            }
            
            setUpdate(result)
        },
        handleImgUpload = async (img: any = localImg[0]) => {
            const fmData = new FormData()
            fmData.append('image', img)
            setLocalImg([img])
            return await fetchServer({ dest: ACTION.IMG.create, options: { method: 'POST', body: fmData } })
        },
        handleImgRemove = async () => 
            (await fetchServer({ dest: ACTION.IMG.delete, payload: { id: file.img.uid, docId: id } }), removeDocImg(id), rerender()),
        handleImgChange = (img: any) => img ? setLocalImg([img]) : setLocalImg([])

    useEffect(() => setLocalImg(file?.img ? [file.img] : []), [mode, file])

    return (
        visible ? <ModalEditor
            props={{
                collection,
                file,
                files,
                imgList: localImg,
                visible,
                handleClose,
                formRef,
                handleSave,
                handleImgChange,
                setSelectedDocs
            }}
        /> : <></>
    )
}

export default ModalEditorContainer
