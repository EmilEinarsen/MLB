import { AppBar, Button, FormControlLabel, IconButton, makeStyles, Switch, Toolbar } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import { Drawer } from 'antd'
import React from 'react'
import MenuDocument, { context } from '../MenuDocument'

interface Props {
	props: {
		dense: boolean,
		toggleDense: () => void,
		secondary: boolean,
		toggleSecondary: () => void,
		content: boolean,
		toggleContent: () => void,
		drawer: boolean,
		setFalse: () => void,
		setTrue: () => void,
	}
}

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	toolbar: {
		display: 'grid',
		gridAutoFlow: 'column',
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(2),
	}
}))

const ListToolbar: React.FC<Props> = ({
	props: {
		dense,
		toggleDense,
		secondary,
		toggleSecondary,
		content,
		toggleContent,
		drawer,
		setFalse,
		setTrue
	} 
}) => {
	const classes = useStyles()
	
	return (
		<>
			<div className={classes.root}>
				<AppBar position="static" color="inherit" variant="outlined">
					<Toolbar className={classes.toolbar}>
						<Button onClick={setTrue}>
							Appearance
						</Button>
						<div style={{ justifySelf: 'end' }}>
							<MenuDocument envContext={context.list} />
						</div>
					</Toolbar>
				</AppBar>
			</div>
			<Drawer
				title="Basic Drawer"
				placement="left"
				closable={false}
				onClose={setFalse}
				visible={drawer}
				>
				<FormControlLabel
					control={<Switch checked={dense} onChange={toggleDense} />}
					label="Dense"
					labelPlacement="top"
				/>
				<FormControlLabel
					control={<Switch checked={secondary} onChange={toggleSecondary} />}
					label="Text"
					labelPlacement="top"
				/>
				<FormControlLabel
					control={<Switch checked={content} onChange={toggleContent} />}
					label="Content"
					labelPlacement="top"
				/>
			</Drawer>
		</>
	)
}

export default ListToolbar
