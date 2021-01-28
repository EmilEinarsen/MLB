import React from 'react'
import { Upload } from 'antd'

interface Props {
    props: {
        imgList: any[]
        handleImgUpload: (img: any) => any
        handleImgRemove: () => Promise<boolean>
    }
}

const Uploader: React.FC<Props> = ({ 
    props: {
        imgList,
        handleImgRemove,
        handleImgUpload
    }
}) => {
    return (
        <>
            <Upload
                name='photo'
                onChange={(info) => {
                    console.log(info)
                }}
                customRequest={async (options: any) => {
                    const { onSuccess, onError, file, onProgress } = options
                    
                    try {
                        onProgress({ percent: 100 })
                        await handleImgUpload(file)
                        onSuccess('Ok')
                    } catch (error) {
                        console.log('Error: ', error)
                        onError({ error: new Error('Some error') })
                    }
                }}
                onRemove={handleImgRemove}
                listType="picture-card"
            >
                { !imgList.length && '+ Upload' }
            </Upload>
        </>
    )
}

export default Uploader