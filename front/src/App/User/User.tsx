import React from 'react'
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Link, List, ListItem, ListItemSecondaryAction, ListItemText, makeStyles, Tooltip, Typography } from '@material-ui/core'
import { ExitToApp } from '@material-ui/icons'

interface Props {
	logout: () => void
	username: string
	handleUsername?: () => void
	handleEmail?: () => void
	handlePassword?: () => void
}

const useStyle = makeStyles(theme => ({
	root: {
		display: 'grid',
		placeContent: 'center',
		height: '90vh'
	},
	card: {
		padding: theme.spacing(3, 2),
		minWidth: '50ch',
	},
	name: {
		display: 'grid',
		placeContent: 'center',
		height: '125px',
		width: '100%',
		padding: theme.spacing(0, 0, 1, 0)
	},
	avatar: {
		width: theme.spacing(4),
		height: theme.spacing(4)
	},
	actionBox: {
		display: 'grid',
		placeContent: 'center',
		padding: theme.spacing(6, 0, 0, 0)
	},
	warningLink: {
		color: '#ff9800'
	},
	disabledLink: {
		color: '#64b5f6'
	}
}))

const User: React.FC<Props> = ({ 
	logout, 
	username, 
	handleUsername, 
	handleEmail, 
	handlePassword 
}) => {
	const classes = useStyle()

	const disabledLink: { underline: 'none', component: 'button', disabled: boolean, className: string } = {
		underline: 'none',
		component: 'button',
		disabled: true,
		className: classes.disabledLink
	}

	return (
		<Box className={classes.root}>
			<Card className={classes.card}>
				<CardHeader 
					avatar={<Avatar className={classes.avatar} />}
					title={<Typography variant="subtitle1">User</Typography>}
					action={
						<Tooltip title="Logout" aria-label="loguot">
							<IconButton onClick={logout}><ExitToApp /></IconButton>
						</Tooltip>
					}
				/>
				
				<CardMedia className={classes.name}>
					<Typography variant="h5">{username}</Typography>
				</CardMedia>

				<CardContent>
					<List>
						<Divider />
						<ListItem>
							<ListItemText>
								Username
							</ListItemText>
							<ListItemSecondaryAction>
								{ handleUsername 
									? <Link>Update</Link>
									: <Link {...disabledLink}>Update</Link>
								}
							</ListItemSecondaryAction>
						</ListItem>

						<Divider />
						<ListItem>
							<ListItemText>
								Email
							</ListItemText>
							<ListItemSecondaryAction>
								{ handleEmail
									? <Link className={classes.warningLink}>Change</Link>
									: <Link {...disabledLink}>Change</Link>
								}
							</ListItemSecondaryAction>
						</ListItem>

						<Divider />
						<ListItem>
							<ListItemText>
								Password
							</ListItemText>
							<ListItemSecondaryAction
							>
								{ handlePassword
									? <Link className={classes.warningLink}>Change</Link>
									: <Link {...disabledLink}>Change</Link>
								}
							</ListItemSecondaryAction>
						</ListItem>
					</List>
				</CardContent>

				<CardActions className={classes.actionBox}>
					<Button color="primary" variant="contained" size="small" startIcon={<ExitToApp />} onClick={logout}>Logout</Button>
					<Button color="secondary" variant="text" size="small" disabled>Delete</Button>
				</CardActions>
			</Card>
		</Box>
	)
}

export default User
