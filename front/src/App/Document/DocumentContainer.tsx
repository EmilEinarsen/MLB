import React, { useContext } from 'react'
import { contextAuth } from '../../Providers/AuthProvider'
import { contextData } from '../../Providers/DataProvider'
import { contextEdit, EModal, EQuantity, EType } from '../../Providers/EditProvider'
import Document from './Document'

const DocumentContainer: React.FC = () => {
	const {
		files,
		hooks: {
			file: { selectedFile }
		}
	}: any = useContext(contextData)

	const { refMounted }: any = useContext(contextAuth)

	const { mode: [ , setMode ] }: any = useContext(contextEdit)

	const file = files.find(((file: Doc) => file.id === selectedFile))

	const edit = () => setMode({ modal: EModal.edit, type: EType.doc, quantity: EQuantity.single })
	const remove = () => setMode({ modal: EModal.remove, type: EType.doc, quantity: EQuantity.single })
	
	return <Document
		file={file}
		edit={edit}
		remove={remove}
		props={{ refMounted }}
	/>
}

export default DocumentContainer
