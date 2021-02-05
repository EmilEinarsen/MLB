import { Form, Input, Modal, Select } from 'antd'
import React from 'react'
import Uploader from '../Uploader/Uploader'

interface Props {
    props: {
        collection?: Collection 
        file?: Doc
        files?: Doc[]
        visible: boolean
        handleClose: () => void
        imgList: any[]
        handleImgChange: (img: any) => any
        formRef: any
        handleSave: () => void
        setSelectedDocs: (values: string[]) => void
    }
}

const ModalEditor: React.FC<Props> = ({
    props: {
        collection,
        file, 
        files,
        visible, 
        handleClose, 
        imgList, 
        formRef, 
        handleSave, 
        handleImgChange,
        setSelectedDocs
    }
}) => (
    <Modal
        centered
        visible={visible}
        onCancel={handleClose}
        onOk={handleSave}
        width={800}
        okText='Save'
    >´
        { file ? 
            <Form labelAlign='right' layout='vertical' ref={formRef}>
                <Form.Item label="Title:" name="title">
                    <Input.TextArea showCount maxLength={100} defaultValue={file.title} allowClear />
                </Form.Item>

                <Form.Item label="Subtitle:" name="subtitle">
                    <Input.TextArea showCount maxLength={100} defaultValue={file.subtitle} allowClear />
                </Form.Item>

                <Form.Item label="Text:" name="text">
                    <Input.TextArea autoSize showCount defaultValue={file.text} allowClear/>
                </Form.Item>

                <Form.Item label="Image:" name="image">
                    <Uploader props={{ imgList, handleImgChange }} />
                </Form.Item>
            </Form>

            : collection ?
            <Form labelAlign='right' layout='vertical' ref={formRef}>
                <Form.Item label="Title:" name="title">
                    <Input.TextArea showCount maxLength={100} defaultValue={collection.title} allowClear />
                </Form.Item>

                <Select mode="tags" style={{ width: '100%' }} placeholder="Tags Mode" onChange={values => setSelectedDocs(values)} defaultValue={collection.docs.map(doc=>doc.id)}>
                    {files?.map(doc => <Select.Option value={doc.id}>{ doc.title }</Select.Option>)}
                </Select>
            </Form>

            : <><p>No Structure available</p></>
        }
    </Modal>
)

export default ModalEditor
