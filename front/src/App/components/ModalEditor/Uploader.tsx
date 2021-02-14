import React from 'react'
import { Button, Col, Row, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { baseUrl } from '../../../Hooks/useServer'

interface Props {
    props: {
        img?: any
        handleImgChange: (list?: any, index?: number) => any
        music?: any
        handleMusicChange: (list?: any, index?: number) => any
		index?: number
		label?: string
    }
}

const Uploader: React.FC<Props> = ({ 
    props: {
        img,
        handleImgChange,
		index,
		label,
		music,
		handleMusicChange
    }
}) => (
	<Row gutter={12}>
		<Col span={12} style={{ display: 'grid', gap: '5px' }}>
			<label>Image:</label>
			<Upload
				onRemove={() => handleImgChange(undefined, index)}
				beforeUpload={(img) => (handleImgChange(img, index), false) }
				fileList={!img ? img : img.size ? [img] : [correctUrl(img)]}
			>
				<Button icon={<UploadOutlined />}>{ label ?? 'Select Image' }</Button>
			</Upload>
		</Col>
		<Col span={12} style={{ display: 'grid', gap: '5px' }}>
			<label>Music:</label>
			<Upload
				onRemove={() => handleMusicChange(undefined, index)}
				beforeUpload={(music) => (handleMusicChange(music, index), false) }
				fileList={!music ? music : music.size ? [music] : [correctUrl(music)]}
			>
				<Button icon={<UploadOutlined />}>{ label ?? 'Select Music' }</Button>
			</Upload>
		</Col>
	</Row>
)

const correctUrl = ({ url, ...rest }: any) => ({ url: baseUrl + url, ...rest })

export default Uploader