import React from 'react'
import { List, Typography, Divider, Box, Button } from "@material-ui/core"
import './List.sass'
import CollectionContainer from '../Collection/CollectionContainer'
import ListItemFile from '../ListItemFile/ListItemFile'
import { Empty } from 'antd'
import MenuDocument from '../MenuDocument'
import { Add } from '@material-ui/icons'
import { EMenuAppearance } from '../MenuDocument/MenuDocument'

interface Props {
	list: { [key: string]: Doc[] }
	collections: Collection[]
	configuration: {
		dense: boolean,
		secondary: boolean,
		content: boolean
	}
	props: {
		checked: string[],
		handleCheck: (value: string) => void,
		setSelectedFile: (value: string) => void,
		selectedFile: string
		refMounted: any
	}
}

const _List: React.FC<Props> = ({
	list,
	collections,
	configuration: {
		dense,
		secondary,
		content
	},
	props: {
		checked,
		handleCheck,
		selectedFile,
		setSelectedFile,
		refMounted
	}
}) => {
	
	return (
		<>
			{ collections.map((collection: Collection) => 
				<CollectionContainer 
					key={collection.id}
					collection={collection}
					props={{
						checked,
						handleCheck,
						selectedFile,
						setSelectedFile,
						secondary,
						content
					}}
				/>)
			}
			{ Object.entries(list).length ?
				<>
					<Divider />
					{ Object.entries(list).map(([key, files]) =>
						<List dense={dense} key={key+'List'} id={'group-'+key.charCodeAt(0)}>

							<Box pl={2} >
								<Typography
									color="textSecondary"
									variant="caption"
									display="block"
								>
									{key}
								</Typography>
							</Box>

							<Divider />

							{ files.map(file =>
								<ListItemFile 
									key={file.id}
									props={{
										file,
										checked,
										handleCheck,
										selectedFile,
										setSelectedFile,
										secondary,
										content,
									}}
								/>
							)}

						</List>
					)}
				</>
			: 
				<Box style={{ display: 'grid', placeContent: 'center', height: '80%' }}>
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<p>No songs</p>}>
						<MenuDocument 
							altButton={(onClick) =>
								<Button onClick={onClick} variant="contained" color="primary" size="large">
									<Add />
								</Button>
							} 
							appearance={EMenuAppearance.add}
						/>
					</Empty>
				</Box>
			}

			<div ref={refMounted}></div>
		</>
	)
}

export default _List