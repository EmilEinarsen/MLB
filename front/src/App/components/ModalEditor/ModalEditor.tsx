import React from 'react'
import { Form, Input, Modal, Select } from 'antd'
import { EModal, EType, TMode } from '../../../Providers/EditProvider'
import Uploader from './Uploader'
import { CreateCollectionForm, CreateDocForm } from './CreateForms'

interface Props {
    props: {
        collection?: Collection 
        file?: Doc
        files?: Doc[]
        visible: boolean
        loading: boolean
        handleClose: () => void
        imgList: any[]
		musicList: any[]
        handleImgChange: (img?: any, index?: number) => any
        handleMusicChange: (music?: any, index?: number) => any
        handleSave: () => void
		setSelectedDocs: (values: string[]) => void
		mode: TMode
		refForm: any
    }
}

const ModalEditor: React.FC<Props> = ({
    props: {
        collection,
        file, 
        files,
        visible,
		loading,
        handleClose, 
        imgList,
		musicList,
        handleSave,
        handleImgChange,
        handleMusicChange,
		setSelectedDocs,
		mode,
		refForm
    }
}) => (
    <Modal
        centered
        visible={visible}
		confirmLoading={loading}
        onCancel={handleClose}
        onOk={handleSave}
        width={800}
        okText={ mode.modal === EModal.edit ? 'Save' : 'Create' }
		cancelText={ mode.modal === EModal.edit ? 'Close' : 'Cancel' }
		destroyOnClose={true}
    >
		{ 
			mode.type === EType.doc ? 
				mode.modal === EModal.edit ? 
					<DocForm props={{ file, refForm, imgList, handleImgChange, musicList, handleMusicChange }} /> 
					: <CreateDocForm props={{ refForm, imgList, handleImgChange, musicList, handleMusicChange }} />
			: mode.type === EType.collection ?
				mode.modal === EModal.edit ? 
					<CollectionForm props={{ collection, refForm, files, setSelectedDocs }} />
					: <CreateCollectionForm props={{ refForm, files, setSelectedDocs }} />
			: <><p>No Structure available</p></>
        }
    </Modal>
)

const DocForm = ({ props: { file, refForm, imgList, handleImgChange, musicList, handleMusicChange } }: any) => (
	<Form 
		labelAlign='right' 
		layout='vertical'
		initialValues={{
			title: file?.title,
			subtitle: file?.subtitle,
			text: file?.text
		}}
		ref={refForm}
	>
		<Form.Item 
			label="Title:" 
			name="title" 
			rules={[
				{ required: true, message: 'A title is required' }
			]}
			hasFeedback

		>
			<Input allowClear />
		</Form.Item>

		<Form.Item 
			label="Subtitle:" 
			name="subtitle"
		>
			<Input allowClear />
		</Form.Item>

		<Form.Item 
			label="Text:" 
			name="text"
		>
			<Input.TextArea showCount allowClear />
		</Form.Item>

		<Uploader props={{ img: imgList[0], handleImgChange, music: musicList[0], handleMusicChange }} />
	</Form>
)

const CollectionForm = ({ props: { collection, refForm, files, setSelectedDocs } }: any) => (
	<Form 
		labelAlign='right' 
		layout='vertical'
		initialValues={{ 
			title: collection?.title 
		}}
		ref={refForm}
	>
		<Form.Item label="Title:" name="title">
			<Input.TextArea showCount maxLength={100} allowClear />
		</Form.Item>

		<Select mode="tags" style={{ width: '100%' }} placeholder="Tags Mode" onChange={values => setSelectedDocs(values)} defaultValue={collection?.docs?.map((doc: Doc)=>doc.id)}>
			{files?.map((doc: Doc) => <Select.Option key={doc.id} value={doc.id}>{ doc.title }</Select.Option>)}
		</Select>
	</Form>
)

export default ModalEditor
