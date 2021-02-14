import { Avatar, Collapse, createStyles, IconButton, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Theme } from '@material-ui/core'
import { ExpandLess, ExpandMore, Folder, FolderOpen } from '@material-ui/icons'
import React from 'react'
import ListItemFile from '../ListItemFile'
import MenuDocument from '../MenuDocument'
import { EMenuAppearance } from '../MenuDocument/MenuDocument'

interface Props { 
    collection: Collection
    open: boolean
    onClick: () => void
	configuration: {
		secondary: boolean
        content: boolean
	}
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        accordion: {
            display: 'flex !important'
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
    }),
)

const Collection: React.FC<Props> = ({
    collection,
    open,
    onClick,
	configuration
}) => {
    const classes = useStyles()

    return (
        <>
            <ListItem className={classes.accordion}>
				<ListItemAvatar>
					<Avatar variant="rounded">
						{ !open ? <Folder style={{ fontSize: 20 }} /> : <FolderOpen style={{ fontSize: 20 }} /> }
					</Avatar>
				</ListItemAvatar>
                <ListItemText primary={collection.title} />
                { !!collection.docs?.length && 
					<IconButton size="small" onClick={onClick}>{open ? <ExpandLess /> : <ExpandMore />}</IconButton> 
				}
                <MenuDocument appearance={EMenuAppearance.collection} size="small" id={collection.id} />
            </ListItem>
            { !!collection.docs?.length &&
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{ collection.docs.map((doc: Doc) =>
							<ListItemFile
								key={doc.id}
								className={classes.nested}
								file={doc}
								configuration={configuration}
							/>
						)}
						
					</List>
				</Collapse>
			}
        </>
    )
}
export default Collection
