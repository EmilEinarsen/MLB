import React from 'react'
import { Hidden, Grid, Box, Fab, makeStyles } from '@material-ui/core'
import List from '../components/List/ListContainer'
import Document from '../Document/DocumentContainer'
import './Folder.sass'
import ListToolbar from '../components/ListToolbar/ListToolbarContainer'
import AlphabeticalSlider from '../components/AlphabeticalSlider/AlphabeticalSliderContainer'
import { group } from '../../Helpers/Helpers'
import { Affix } from 'antd'
import { Add, LoopRounded } from '@material-ui/icons'
import FabBox from '../components/FabBox/FabBoxContainer'
import MenuDocument from '../components/MenuDocument/MenuDocumentContainer'
import { EMenuAppearance } from '../components/MenuDocument/MenuDocument'

interface Props {
	props: {
		files: Doc[],
		dense: boolean,
		toggleDense: () => void,
		secondary: boolean,
		toggleSecondary: () => void,
		content: boolean,
		toggleContent: () => void,
		selectedFile: string,
		listContainer: HTMLElement | null,
		setListContainer: (instance: HTMLDivElement | null) => void
		refMounted: any
		reload: () => void
	}
}

const useStyles = makeStyles(theme => ({
	root: { 
		height: 'calc( 100vh - 50px )'
	},
	fabBocRel: { 
		position: 'relative'
	},
	folderAligner: {
		display: 'grid',
		placeContent: 'center',
		[theme.breakpoints.down('sm')]: {
			padding: theme.spacing(0, 4, 0, 4) 
		}
	},
	inheritHeight: {
		height: 'inherit'
	},
	fullWidth: {
		width: '100%'
	},
	listContainer: {
		height: 'inherit',
		paddingTop: theme.spacing(4) 
	},
	folder: {
		minWidth: '45ch',
		width: '50vw',
		maxWidth: '90ch'
	},
}))

const Folder: React.FC<Props> = ({ 
	props: { 
		files,
		dense,
		toggleDense,
		secondary,
		toggleSecondary,
		content,
		toggleContent,
		selectedFile,
		listContainer,
		setListContainer,
		refMounted,
		reload
	} 
}) => {
	const classes = useStyles()

	return (
		<Grid container className={classes.root}>
			<Grid item xs={12} md={6} className={`${classes.inheritHeight} ${classes.fabBocRel}`}>
				<Grid ref={setListContainer} className={`list ${classes.folderAligner} ${classes.inheritHeight}`}>
					<Grid container direction="row" className={`${classes.inheritHeight} ${classes.folder}`}>
						<Grid className={classes.fullWidth}>
							<Affix target={() => listContainer}>
								<ListToolbar props={{
									dense,
									toggleDense,
									secondary,
									toggleSecondary,
									content,
									toggleContent,
								}}/>
							</Affix>
						</Grid>
						<Grid container className={classes.listContainer} spacing={4}>
							<Grid item xs={11}>
								<List 
									list={group(files)} 
									configuration={{ 
										dense, 
										secondary, 
										content
									}}
									props={{ refMounted }}
								/>
							</Grid>
							<Grid item xs={1}>
								<AlphabeticalSlider 
									list={ Object.keys(group(files)).map((k,i)=>[k,i]) }
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<FabBox>
					<Fab onClick={reload} color="default" size="small"><LoopRounded /></Fab>
					<MenuDocument
						transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
						appearance={EMenuAppearance.add} 
						altButton={(onClick: any) => 
							<Fab onClick={onClick} color="primary" size="small"><Add /></Fab>
						} 
					/>
				</FabBox>
			</Grid>
			
			<Hidden smDown>
				<Grid item md={6}><Document /></Grid>
			</Hidden>
		</Grid>
	)
}
export default Folder
