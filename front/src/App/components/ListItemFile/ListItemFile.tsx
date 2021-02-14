import { Avatar, Box, Checkbox, Grid, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles } from '@material-ui/core'
import { MusicNote, Image, Description, DescriptionTwoTone } from '@material-ui/icons'
import React from 'react'
import { truncate } from '../../../Helpers/Helpers'


const useStyles = makeStyles(theme => ({
	chipContainer: {
		display: 'flex',
		gap: '.5em',
		marginRight: '0px'
	}
}))

const ListItemFile = ({
    className,
	props: {
		file,
		checked,
		handleCheck,
		selectedFile,
		setSelectedFile,
		secondary,
		content,
	}
}: {
    className?: any
	props: {
		file: Doc
		checked: string[]
		handleCheck: (value: string) => void
		selectedFile: string
		setSelectedFile: (value: string) => void
		secondary: boolean
		content: boolean
	}  
}) => {
	const classes = useStyles()

	return (
		<ListItem 
			key={file.id}
			onClick={() => setSelectedFile(file.id)}
			button
			className={className}
		>
			<Grid container direction="row" justify="flex-start" alignItems="center">
				<Grid item>
					<ListItemAvatar>
						<Avatar variant="rounded">
							{ file.id !== selectedFile ? <Description style={{ fontSize: 20 }} /> : <DescriptionTwoTone style={{ fontSize: 20 }} />}
						</Avatar>
                  	</ListItemAvatar>
				</Grid>
				<Grid item>
					<ListItemText
						primary={file.title}
						secondary={secondary && file.text ? truncate(file.text, 50, true) : null}
						style={{ paddingRight: '35px' }}
					/>
					<Box>
					</Box>
					{ content &&
						<div className={classes.chipContainer}>
							<Description color={ file.text ? 'inherit' : 'disabled' } />
							<Image color={ file.img ? 'inherit' : 'disabled' } />
							<MusicNote color={ file.music ? 'inherit' : 'disabled' } />
						</div>
					}
				</Grid>	
			</Grid>	
			<ListItemSecondaryAction>
				<Checkbox
					edge="end"
					onChange={() => handleCheck(file.id)}
					checked={checked?.includes(file.id)}
				/>
			</ListItemSecondaryAction>
		</ListItem>
	)
}

export default ListItemFile