import { Form, Input, Modal } from 'antd'
import React from 'react'
import Uploader from '../Uploader/Uploader'

interface Props {
    props: {
        file: undefined | Doc
        visible: boolean
        handleClose: () => void
        imgList: any[]
        handleImgUpload: (img: any) => any
        handleImgRemove: () => Promise<boolean>
        formRef: any
        handleSave: () => void
    }
}

const ModalEditor: React.FC<Props> = ({
    props: { 
        file, 
        visible, 
        handleClose, 
        imgList, 
        formRef, 
        handleSave, 
        handleImgUpload, 
        handleImgRemove
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
        <Form onFinish={(values: any) => console.log(values) } labelAlign='right' layout='vertical' ref={formRef}>
            <Form.Item
                label="Title:"
                name="title"
            >
                <Input.TextArea showCount maxLength={100} defaultValue={file?.title} allowClear />
            </Form.Item>

            <Form.Item
                label="Subtitle:"
                name="subtitle"
            >
                <Input.TextArea showCount maxLength={100} defaultValue={file?.subtitle} allowClear />
            </Form.Item>

            <Form.Item
                label="Text:"
                name="text"
            >
                <Input.TextArea autoSize showCount defaultValue={file?.text} allowClear/>
            </Form.Item>

            <Form.Item 
                label="Image:"
                name="image"
            >
                <Uploader props={{ imgList, handleImgUpload, handleImgRemove }} />
            </Form.Item>
        </Form>
    </Modal>
)

export default ModalEditor
