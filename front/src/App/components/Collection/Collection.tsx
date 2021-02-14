import { Avatar, Collapse, createStyles, IconButton, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Theme } from '@material-ui/core'
import { ExpandLess, ExpandMore, Folder, FolderOpen } from '@material-ui/icons'
import React from 'react'
import ListItemFile from '../ListItemFile/ListItemFile'
import MenuDocument from '../MenuDocument'
import { EMenuAppearance } from '../MenuDocument/MenuDocument'

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

const Collection = ({
    collection,
    open,
    onClick,
    props: {
        checked,
        handleCheck,
		selectedFile,
        setSelectedFile,
        secondary,
        content
    }
}: { 
    collection: Collection, 
    open: boolean, 
    onClick: () => void
    props: {
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
								props={{
									file: doc,
									checked,
									handleCheck,
									selectedFile,
									setSelectedFile,
									secondary,
									content,
								}}
							/>
						)}
						
					</List>
				</Collapse>
			}
        </>
    )
}
export default Collection
