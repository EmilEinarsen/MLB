/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { message, Modal } from 'antd'
import { contextData } from './DataProvider'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ModalEditor from '../App/components/ModalEditor'
import { ACTION, fetchServer } from '../Hooks/useServer'
import useAsync from '../Hooks/useAsync'
import { createData, deleteData, deleteDocFile, updateData } from './serverData'
import { contextAuth } from './AuthProvider'

export enum EModal {
	'add',
	'edit',
    'remove',
    'none'
}

export enum EType {
	'doc',
	'collection',
	'none'
}

export enum EQuantity {
	'single',
	'multiple',
	'none'
}

export type TMode = { modal: EModal, type: EType, quantity: EQuantity }
export type TModeAlt = { modal?: EModal, type?: EType, quantity?: EQuantity }

const defaultMode = { modal: EModal.none, type: EType.none, quantity: EQuantity.none }

interface ContextEdit {
    file?: Doc
	files: Doc[]
    collection?: Collection
	collections: Collection[]
	mode: [ TMode, (arg0: TModeAlt) => void]
	submit: (payload: any) => void
	submitState: any
	resetModal: () => void
	rerender: () => void
}

export const contextEdit = createContext<ContextEdit | undefined>(undefined)

const EditProvider = (
    { children }: { children: ReactNode }
) => {
    const {
		files,
		collections,
		hooks: {
			check: { checked, clearChecked },
			file: { selectedFile, setSelectedFile },
			collection: { selectedCollection }
		},
		rerender
	}: any = useContext(contextData)
	const { checkAuthorization }: any = useContext(contextAuth)
	
	const [ mode, setMode ] = useState<TMode>(defaultMode)
	const handleSetMode = ({modal, type, quantity}: TModeAlt) => 
		setMode((mode) => ({ modal: modal ?? mode.modal, type: type ?? mode.type, quantity: quantity ?? mode.quantity }))
	const resetModal = () => setMode({ ...defaultMode })
	
	const file: Doc | undefined = 
		mode.type === EType.doc && mode.quantity === EQuantity.single && mode.modal !== EModal.add
			? files.find((file: Doc) => file.id === selectedFile) : undefined
	const collection: Collection | undefined = 
		mode.type === EType.collection && mode.quantity === EQuantity.single && mode.modal !== EModal.add
			? collections.find((collection: Collection) => collection.id === selectedCollection) : undefined
	const names: string[] | undefined = 
		file ? [file.title] 
		: collection ? [collection.title] 
		: mode.quantity === EQuantity.multiple ? ((array = []) => ( 
			array = files.filter((doc: Doc) => checked.includes(doc.id)).map((doc: Doc) => doc.title),
			array.length ? array : undefined 
		))()
		: undefined


	const request = mode.type === EType.doc ? ACTION.DOC
		: mode.type === EType.collection ? ACTION.COLLECTION 
		: undefined
	const dest = 
		request ?
			mode.modal === EModal.add ? request.create
			: mode.modal === EModal.edit ? request.update
			: mode.modal === EModal.remove ? request.delete
			: undefined
		: undefined
	const id = mode.modal !== EModal.add ?
			file?.id ?? collection?.id ?? undefined
		: undefined
	const ids = mode.type === EType.doc && mode.quantity === EQuantity.multiple ? checked : undefined
	const submittedPayload = useRef<any>(undefined)
	const fetchRequest = dest ? 
		async (payload: any) => await fetchServer({ dest, payload })
		: undefined

	const [ 
		submitState, submit, { reset: resetSubmitState } 
	] = useAsync(fetchRequest ?? (async () => { throw Error('Undefined fetchRequest') }), false)
	const saveToData = () => {
		const payload = submittedPayload.current
		if(!payload) return
		mode.modal === EModal.add && createData(request, submitState.value)
		mode.modal === EModal.edit && updateData(request, payload.id, payload)
		mode.modal === EModal.remove && deleteData(request, {id, ids})
	}
	const handleSubmit = async (payload: any = {}) => {
		if(mode.quantity === EQuantity.multiple && mode.modal === EModal.add) {
			createMultiple(payload)
			return
		}
		if(!Object.keys(payload).length && mode.modal !== EModal.remove) return
		if(mode.modal === EModal.edit) {
			const object: any = file ?? collection
			Object.keys(payload).forEach((key) => (object)[key] === payload[key] && (delete payload[key]))
		}
		if(!Object.keys(payload).length && mode.modal !== EModal.remove) return

		id && (payload.id = id)
		ids && (payload.ids = ids)
		
		if(mode.type === EType.doc) {
			await handleFile(payload, 'img', checkAuthorization)
			await handleFile(payload, 'music', checkAuthorization)
		}
		
		if(!Object.keys(payload).length) return
		submittedPayload.current = payload
		submit(payload)
	}
	const createMultiple = async (payload: any[]) => {
		payload = await Promise.all(payload.map(async ({ img, music, ...rest }) => {
			try {
				img && (rest.img = await uploadFile(img, checkAuthorization))
				music && (rest.music = await uploadFile(music, checkAuthorization))
				return rest
			} catch (error) {
				return rest
			}
		}))
		
		submittedPayload.current = payload
		submit(payload)
	}

	useEffect(() => {
		mode.modal === EModal.remove && names &&
			showDelete({ onOk: () => handleSubmit(), onCancel: resetModal, names })
	}, [mode])

	useEffect(() => {
		submitState.pending && message.loading({ content: 'Pending...', key: 'submit' })
		submitState.value && (
			message.success({ content: 'Successful!', key: 'submit' }),
			saveToData(),
			rerender(),
			(submittedPayload.current = undefined),
			mode.modal === EModal.add && mode.type === EType.doc && setSelectedFile(submitState.value.id),
			checkAuthorization(submitState),
			resetSubmitState(),
			mode.modal !== EModal.edit && resetModal(),
			mode.quantity === EQuantity.multiple && clearChecked()
		)
		submitState.error && (
			//(async () => addError(await registerState.error.json()))(),
			message.error({ content: 'Error!', key: 'submit' }),
			mode.modal === EModal.remove && resetModal(),
			checkAuthorization(submitState),
			resetSubmitState()
		)
	}, [ submitState ])

    return (
        <contextEdit.Provider value={{
			file,
			files,
			collection,
			collections,
			mode: [ mode, handleSetMode ],
			submit: handleSubmit,
			submitState,
			resetModal,
			rerender
        }}>
            { children }
            <ModalEditor />
        </contextEdit.Provider>
    )
}

const uploadFile = async (fmData: any, checkAuthorization: (response: any) => any) => 
	checkAuthorization(await fetchServer({ dest: ACTION.IMG.create, payload: fmData, options: { JSON: false } }))
const removeFile = async (payload: { id: string, docId: string }, checkAuthorization: (response: any) => any) => 
	checkAuthorization(await fetchServer({ dest: ACTION.IMG.delete, payload }))

const handleFile = async (payload: any, key: string, checkAuthorization: (response: any) => any) => {
	try {
		payload[key] && (
			payload[key] = await uploadFile(payload[key], checkAuthorization)
		)
		payload[key+'Uid'] && (
			await removeFile({ id: payload[key+'Uid'], docId: payload.id }, checkAuthorization),
			deleteDocFile(payload.id, key),
			payload[key+'Uid'] && (delete payload[key+'Uid'])
		)
	} catch (error) {
		payload[key] && (delete payload[key])
		payload[key+'Uid'] && (delete payload[key+'Uid'])
	}
}

function showDelete({ onCancel, onOk, names }: any) {
    Modal.confirm({
		title: 
			names.length > 1
				? `Are you sure you want to delete these?` 
				: 'Are you sure you want to delete this?'
        ,
		content: 
			names.length > 1
				? names.map((title: string, index: number) => title+(index < names.length-1 ? ', ' : '')) 
				: names[0]
		,
        icon: <ExclamationCircleOutlined />,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: onOk,
        onCancel: onCancel
    })
}

export default EditProvider
