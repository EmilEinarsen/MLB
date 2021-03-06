import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import Navbar from '../Navbar'
import Folder from '../Folder'
import Document from '../Document'
import User from '../User'
import { navigation } from '../../Providers/PageProvider'

interface Props {
	page: navigation
}

const useStyles = makeStyles(theme => ({
	root: {
		height: '100vh'
	}
}))

const Main: React.FC<Props> = ({ page }) => {
	const classes = useStyles()

	return (
		<Grid className={classes.root}>
			<div style={page === navigation.folder ? {} : {display: 'none'}}>
				<Folder />
			</div>
			<div style={page === navigation.selected ? {} : {display: 'none'}}>
				<Document />
			</div>
			{ page === navigation.user && 
				<User />
			}
			<Navbar />
		</Grid>
	)
}

export default Main
