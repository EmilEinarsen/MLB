/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useContext, useEffect, useRef, useState } from 'react'
import { contextEdit, EModal, EQuantity, EType } from '../../../Providers/EditProvider'
import ModalEditor from './ModalEditor'

const formDataFile = (file: any, fmData = new FormData()) => (fmData.append('file', file), fmData)

const handleFile = (orignalFile: any, array: any[], fieldValues: any, key: string) => {
	orignalFile && (
		orignalFile[key] && !array.length && (fieldValues[key+'Uid'] = orignalFile[key].uid),
		(
			(!orignalFile[key] && array.length)
			|| (orignalFile[key] && array.length && orignalFile[key].uid !== array[0].uid)
		) && (fieldValues[key] = formDataFile(array[0]))
	)
	!orignalFile && array.length && (fieldValues[key] = formDataFile(array[0]))
	return fieldValues
}

const getChangedFieldsValue = (ref: any, previous: any) => {
	const values = ref.getFieldsValue()
	previous && Object.keys(values).forEach(
		(key) => values[key] === previous[key] && (delete values[key])
	)
	return values
}
	

const ModalEditorContainer = () => {
    const {
		file,
		files,
		collection,
        mode: [ mode ],
		submit,
		submitState,
		resetModal,
		rerender
    }: any = useContext(contextEdit)

	const refForm = useRef<any>()

    const 
        visible = mode.modal !== EModal.remove && mode.modal !== EModal.none,
		loading = submitState.pending,
        [ localImg, setLocalImg ] = useState<any>(file?.img ? [file.img] : []),
        [ localMusic, setLocalMusic ] = useState<any>(file?.music ? [file.music] : []),
        [ selectedDocs, setSelectedDocs ] = useState<[] | string[][]>([]),
        handleSave = () => {
			mode.modal === EModal.add
				? createMultiple()
				: saveSingle()
        },
		saveSingle = async () => {
			try {
				await refForm.current.validateFields()
			} catch (error) {
				return
			}
			/* const errors = await validateForm(refForm.current)
			if(errors.length) return */

            const fieldValues = getChangedFieldsValue(refForm.current, mode.type === EType.doc ? file : collection)
			
            ;selectedDocs[0] && mode.type === EType.collection && (fieldValues.docIds = selectedDocs[0])

            handleFile(file, localImg, fieldValues, 'img')
			handleFile(file, localMusic, fieldValues, 'music')
			
            submit(fieldValues)
		},
		createMultiple = async () => {
			try {
				await refForm.current.validateFields()
			} catch (error) {
				return
			}
			const fields = refForm.current.getFieldsValue().fields
			
			mode.type === EType.doc && fields.forEach(
				(field: any, index: number) => {
					localImg[index] && (field.img = formDataFile(localImg[index]))
					localMusic[index] && (field.music = formDataFile(localMusic[index]))
				}
			)

			mode.type === EType.collection && fields.forEach(
				(field: any, index: number) => selectedDocs[index] && (field.docIds = selectedDocs[index])
			)
			
			submit(fields)
		},
		handleImgChange = (img?: any, index?: number) => {
			mode.modal === EModal.add && mode.type === EType.doc 
				? (index || index === 0) && setLocalImg((imgList: any) => (imgList[index] = img, [...imgList]))
				: img ? setLocalImg([img]) : setLocalImg([])
		},
		handleMusicChange = (music?: any, index?: number) => {
			mode.modal === EModal.add && mode.type === EType.doc 
				? (index || index === 0) && setLocalMusic((musicList: any) => (musicList[index] = music, [...musicList]))
				: music ? setLocalMusic([music]) : setLocalMusic([])
		},
		handleSelectedDocs = (docIds: string[], index?: number) =>
			(index || index === 0) ? 
				setSelectedDocs((docsList: string[][]) => (docsList[index] = docIds, [...docsList]))
				: setSelectedDocs([docIds])
	
	useEffect(() => setLocalImg(file?.img ? [file.img] : []), [file?.img, mode])
	useEffect(() => setLocalMusic(file?.music ? [file.music] : []), [file?.music, mode])
	
    return (
        <ModalEditor
            props={{
                collection,
                file,
				files,
                imgList: localImg,
				musicList: localMusic,
                visible,
				loading,
                handleClose: resetModal,
                handleSave,
				handleImgChange,
				handleMusicChange,
				setSelectedDocs: handleSelectedDocs,
				mode,
				refForm
            }}
        />
    )
}

export default ModalEditorContainer
