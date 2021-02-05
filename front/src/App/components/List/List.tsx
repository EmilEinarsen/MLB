import React from 'react'
import { List, ListItem, ListItemText, Typography, Divider, Box, ListItemSecondaryAction, Checkbox } from "@material-ui/core"
import { MusicNote, Description, Image } from '@material-ui/icons'
import './List.sass'
import { truncate } from '../../../Helpers'
import CollectionContainer from '../Collection/CollectionContainer'
import ListItemFile from '../ListItemFile.tsx/ListItemFile'

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
		setSelectedFile
	}
}) => {
	
	return (
		<Box>
			{ collections.map((collection: Collection) => 
				<CollectionContainer 
					collection={collection}
					props={{
						checked,
						handleCheck,
						setSelectedFile,
						secondary,
						content
					}}
				/>)
			}
			
			<Divider />

			{ Object.entries(list).map(([key, files], index) =>
				<List dense={dense} key={key+'List'} id={'group-'+key}>

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
							props={{
								file,
								checked,
								handleCheck,
								setSelectedFile,
								secondary,
								content,
							}}
						/>
					)}

				</List>
			)}
		</Box>
	)
}

export default _List