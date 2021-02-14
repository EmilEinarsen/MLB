import React from "react"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Form, Input, Select, Space } from "antd"
import Uploader from "./Uploader"


export const CreateDocForm = ({ 
	props: { 
		refForm, 
		imgList, 
		handleImgChange,
		musicList, 
		handleMusicChange 
}}: any) => (
	<Form
		layout='vertical'
		ref={refForm}
		name="dynamic-docs-form"
	>
		<Form.List name="fields">
			{(fields, { add, remove }) => 
				<Space direction="vertical" style={{ width: '100%', padding: '15px 30px 0 30px', gap: '10px' }}>
					{ fields.map((field, index) =>
					<SpecialCard  key={index} {...{field, remove}}>
						<Form.Item
							{...field} 
							label="Title" 
							name={[field.name, 'title']}
							rules={[
								{ required: true, message: 'A title is required' }
							]}
							hasFeedback
						>
							<Input allowClear />
						</Form.Item>

						<Form.Item 
							{...field} 
							label="Subtitle:" 
							name={[field.name, 'subtitle']}
						>
							<Input allowClear />
						</Form.Item>

						<Form.Item 
							{...field} 
							label="Text:" 
							name={[field.name, 'text']}
						>
							<Input.TextArea showCount allowClear />
						</Form.Item>

						<Uploader props={{ img: imgList[index], handleImgChange, index, music: musicList[index], handleMusicChange }} />
					</SpecialCard>
					)}
					<Form.Item>
						<Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} />
					</Form.Item>
				</Space>
			}
		</Form.List>
	</Form>
)

export const CreateCollectionForm = ({ props: { refForm, files, setSelectedDocs } }: any) => (
	<Form 
		labelAlign='right' 
		layout='vertical'
		ref={refForm}
		name="dynamic-docs-form"
	>
		<Form.List name="fields">
			{(fields, { add, remove }) => 
				<Space style={{ width: '100%', padding: '30px 15px 0 15px' }} direction="vertical">
					{ fields.map((field, index) =>
						<SpecialCard key={index} {...{field, remove}}>
							<Form.Item
								{...field} 
								label="Title:" 
								name={[field.name, 'title']}
								fieldKey={[field.fieldKey, 'title']}
								rules={[
									{ required: true, message: 'A title is required' }
								]}
								hasFeedback
							>
								<Input allowClear />
							</Form.Item>

							<Select mode="tags" style={{ width: '100%' }} placeholder="Tags Mode" onChange={values => setSelectedDocs(values, index)}>
								{files?.map((doc: Doc) => <Select.Option key={doc.id} value={doc.id}>{ doc.title }</Select.Option>)}
							</Select>
						</SpecialCard>
					)}
					<Form.Item>
						<Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
							Add playlist
						</Button>
					</Form.Item>
				</Space>
			}
		</Form.List>
	</Form>
)

const SpecialCard = ({ 
	children,
	field, 
	remove
}: any) => (
	<Space key={field.key} direction="vertical" style={{ width: '100%', border: '1px solid #f0f0f0', borderRadius: '2px', padding: '15px 24px 15px 24px' }}>
		<div style={{ display: 'grid', placeContent: 'end' }}><MinusCircleOutlined onClick={() => remove(field.name)} /></div>
		{ children }
	</Space>
)