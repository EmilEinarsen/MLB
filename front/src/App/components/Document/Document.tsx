import React from 'react'
import { makeStyles, Card, CardHeader, CardContent, Box, CardMedia, Typography, Fab } from '@material-ui/core'
import { Empty, Skeleton } from 'antd'
import MenuDocument, { context } from '../MenuDocument'
import { Edit } from '@material-ui/icons'
import FabBox from '../FabBox'

interface Props {
	file: Doc | undefined
	style?: object
	props: any
}

const useStyles = makeStyles(theme => ({
	root: {
		display: 'grid',
		placeContent: 'center',
	},
	card: {
		padding: theme.spacing(3, 2),
		maxWidth: '80ch'
	},
}))

const Document: React.FC<Props> = ({
	file,
	style,
	props: {
		editDoc,
		isMounted
	}
}) => {
	const classes = useStyles()

	return (
		<>
			<Box className={classes.root} style={style}>
				{ file ?
					<>
						<Card className={classes.card}>
							<CardHeader 
								title={file.title}
								subheader={ file.subtitle && file.subtitle }
								action={ <MenuDocument envContext={context.document} /> } 
							/>
							{ file.img && <CardMedia component="img" width='100%' image={`http://localhost:3000/img/get/${file.img.name}`}></CardMedia> }
							{ file.text &&
								<CardContent component="p" style={{ whiteSpace: 'pre-line' }}>
									<Typography variant="body2" color="textPrimary" component="p">
										{file.text}
									</Typography>
								</CardContent>
							}
						</Card>
					</>
				: 
					<Card className={classes.card}>
						<Empty description={false} />
					</Card> 
				}
			</Box>
			<FabBox onClick={editDoc}>
				<Fab color="primary" size="small" aria-label="edit" onClick={editDoc}><Edit /></Fab>
			</FabBox>
			<div ref={isMounted}></div>
		</>
	)
}

export default Document
