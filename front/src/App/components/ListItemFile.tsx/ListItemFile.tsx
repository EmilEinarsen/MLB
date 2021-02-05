import { Checkbox, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core'
import { Description, MusicNote, Image } from '@material-ui/icons'
import React from 'react'
import { truncate } from '../../../Helpers'

const ListItemFile = ({
    className,
	props: {
		file,
		checked,
		handleCheck,
		setSelectedFile,
		secondary,
		content,
	}
}: {
    className?: any,
	props: {
		file: Doc,
		checked: string[], 
		handleCheck: (value: string) => void,
		setSelectedFile: (value: string) => void,
		secondary: boolean, 
		content: boolean
	}  
}) => (
	<ListItem 
		key={file.id}
		onClick={() => setSelectedFile(file.id)}
        button
        className={className}
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
)

export default ListItemFile