import React from 'react'
import { makeStyles, Card, CardHeader, CardContent, IconButton, Box } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import { Empty } from 'antd'

interface Props {
	file: Doc | undefined
}

const useStyles = makeStyles(theme => ({
	root: {
		display: 'grid',
		alignContent: 'center',
		height: '100%'
	},
	card: {
		padding: theme.spacing(3, 2),
	},
}))

const Document: React.FC<Props> = ({
	file
}) => {
	const classes = useStyles()

	return (
		<Box className={classes.root}>
			<Card className={classes.card}>
				{ file ?
					<>
						<CardHeader 
							title={file.title} 
							action={
								<IconButton aria-label="settings">
									<MoreVert />
								</IconButton>
							} 
						/>
						{ file.text &&
							<CardContent component="p" style={{ whiteSpace: 'pre-line' }}>
								{file.text}
							</CardContent>
						}
					</>
				: <Empty description={false} />}
			</Card>
		</Box>
	)
}

export default Document
