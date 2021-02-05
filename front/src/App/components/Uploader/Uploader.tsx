import React from 'react'
import { Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

interface Props {
    props: {
        imgList: any[]
        handleImgChange: (list?: any) => any
    }
}

const Uploader: React.FC<Props> = ({ 
    props: {
        imgList,
        handleImgChange
    }
}) => {
    return (
        <>
            <Upload
                name='photo'
                onRemove={() => handleImgChange()}
                beforeUpload={(img) => (handleImgChange(img), false) }
                fileList={imgList}
            >
                <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
        </>
    )
}

export default Uploader