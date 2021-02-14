import React from 'react'
import { makeStyles, Card, CardHeader, CardContent, Box, CardMedia, Typography, Fab, CardActions } from '@material-ui/core'
import { Empty } from 'antd'
import MenuDocument from '../components/MenuDocument/MenuDocumentContainer'
import { Delete, Edit } from '@material-ui/icons'
import FabBox from '../components/FabBox/FabBoxContainer'
import { EMenuAppearance } from '../components/MenuDocument/MenuDocument'
import { baseUrl } from '../../Hooks/useServer'
import ReactAudioPlayer from 'react-audio-player'

interface Props {
	file: Doc | undefined
	style?: object
	edit?: () => void
	remove?: () => void
	props: {
		refMounted: any
	}
}

const useStyles = makeStyles(theme => ({
	fabBoxRel: {
		position: 'relative'
	},
	scrollBox: {
		overflowY: 'scroll',
		height: 'calc(100vh - 50px)'
	},
	alignCard: {
		minHeight: '100%',
		display: 'grid',
		placeContent: 'center',
		[theme.breakpoints.down('sm')]: {
			padding: theme.spacing(0, 4, 0, 4) 
		}
	},
	card: {
		minWidth: '45ch',
		maxWidth: '90ch'
	},
	cardContent: {
		whiteSpace: 'pre-line' 
	},
	audioBox: {
		display: 'grid',
		placeContent: 'center',
	},
}))

const Document: React.FC<Props> = ({
	file,
	style,
	edit,
	remove,
	props: {
		refMounted
	}
}) => {
	const classes = useStyles()

	return (
		<Box className={classes.fabBoxRel}>
			<Box className={classes.scrollBox}>
				<Box className={classes.alignCard} style={style}>
					{ file ?
						<Card className={classes.card}>
							<CardHeader 
								title={file.title}
								subheader={ file.subtitle && file.subtitle }
								action={ <MenuDocument appearance={EMenuAppearance.doc} /> } 
							/>
							{ file.img && <CardMedia component="img" width='100%' image={baseUrl+file.img.url}></CardMedia> }
							{ file.music && 
								<Box className={classes.audioBox}>
									<CardActions><ReactAudioPlayer src={baseUrl+file.music.url} controls /></CardActions>
								</Box>
							}
							{ file.text &&
								<CardContent className={classes.cardContent}>
									<Typography paragraph>
										{file.text}
									</Typography>
								</CardContent>
							}
						</Card>
					: 
						<Box className={classes.alignCard} style={style}>
							<Empty description={<span>Waiting on a song...</span>} />
						</Box>
					}
				</Box>
				{ file && (edit || remove) &&
					<FabBox>
						{ remove && <Fab color="secondary" size="small" aria-label="edit" onClick={remove}><Delete /></Fab> }
						{ edit && <Fab color="primary" size="small" aria-label="edit" onClick={edit}><Edit /></Fab> }
					</FabBox>
				}
				<div ref={refMounted}></div>
			</Box>
		</Box>
	)
}

export default Document
