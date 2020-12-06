import React from 'react'
import { List, ListItem, ListItemText, Typography, Divider, Box, Chip, ListItemSecondaryAction, Checkbox } from "@material-ui/core"
import { MusicNote, Description, Image } from '@material-ui/icons'
import './List.sass'
import { truncate } from '../../../Helpers'

interface Props {
	list: {
		[key: string]: Doc[]
	},
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
}) =>
	<Box>
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

				{ files.map((file, index) =>
					<ListItem 
						key={file.id}
						divider={index < files.length - 1}
						onClick={() => setSelectedFile(file.id)}
						button
					>
						<ListItemText
							primary={file.title}
							secondary={secondary && file.text ? truncate(file.text, 170, true) : null}
							style={{ paddingRight: '35px' }}
						/>
						<ListItemSecondaryAction>
							<Checkbox
								edge="end"
								onChange={() => handleCheck(file.id)}
								checked={checked?.includes(file.id)}
							/>
						</ListItemSecondaryAction>
						{ content &&
							<div className="chip-container">
								{ file.text && <div><Description /></div> }
								{ file.music && <div><MusicNote /></div> }
								{ file.img && <div><Image /></div> }
							</div>
						}
					</ListItem>
				)}

			</List>
		)}
	</Box>


export default _List