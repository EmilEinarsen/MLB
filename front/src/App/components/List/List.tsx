import React from 'react'
import { List, Typography, Divider, Box, Button } from "@material-ui/core"
import './List.sass'
import Collection from '../Collection'
import ListItemFile from '../ListItemFile'
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
}

const _List: React.FC<Props> = ({
	list,
	collections,
	configuration
}) => {
	
	return (
		<>
			{ collections.map((collection: Collection) => 
				<Collection 
					key={collection.id}
					collection={collection}
					configuration={configuration}
				/>)
			}
			{ Object.entries(list).length ?
				<>
					<Divider />
					{ Object.entries(list).map(([key, files]) =>
						<List dense={configuration.dense} key={key+'List'} id={'group-'+key.charCodeAt(0)}>

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
									file={file}
									configuration={configuration}
								/>
							)}

						</List>
					)}
				</>
			: 
				<Box style={{ display: 'grid', placeContent: 'center', height: '80%' }}>
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>No songs</span>}>
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
		</>
	)
}

export default _List