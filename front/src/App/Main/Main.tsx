import React from 'react'
import Navbar from '../components/Navbar'
import Folder from '../Folder'
import { navigation } from '../../Providers/PageProvider'
import { Grid, Box, makeStyles } from '@material-ui/core'
import './Main.sass'
import Document from '../Document'

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
				<Box className="folder-document" >
					<p>User</p>
				</Box>
			}
			<Navbar />
		</Grid>
	)
}

export default Main
