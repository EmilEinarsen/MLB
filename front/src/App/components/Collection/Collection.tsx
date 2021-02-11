import { Collapse, createStyles, IconButton, List, ListItem, ListItemText, makeStyles, Theme } from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import React from 'react'
import ListItemFile from '../ListItemFile.tsx/ListItemFile'
import MenuDocument, { context } from '../MenuDocument'

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
		setSelectedFile: (value: string) => void
        secondary: boolean
        content: boolean
    }
}) => {
    const classes = useStyles()

    return (
        <>
            <ListItem className={classes.accordion}>
                <ListItemText primary={collection.title} />
                { !!collection.docs?.length && 
					<IconButton size="small" onClick={onClick}>{open ? <ExpandLess /> : <ExpandMore />}</IconButton> 
				}
                <MenuDocument envContext={context.collection} size="small" id={collection.id} />
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
