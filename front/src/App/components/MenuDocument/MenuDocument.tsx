import React from 'react'
import { Fade, Grid, IconButton, ListItemIcon, Menu, MenuItem, PopoverOrigin, Typography } from '@material-ui/core'
import { Delete, Edit, MoreVert, Add, CreateNewFolder, NoteAdd } from '@material-ui/icons'
import { EModal, EQuantity, EType } from '../../../Providers/EditProvider'
import NestedMenuItem from "material-ui-nested-menu-item"

interface Props {
    props: {
        handleClose: (value: any) => void
        handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
        anchorEl: null | HTMLElement
		size?: 'small' | 'medium'
		altButton?: (onClick: (event: React.MouseEvent<HTMLButtonElement>) => void) => JSX.Element
		transformOrigin?: PopoverOrigin
		appearance: EMenuAppearance
    }
}

export enum EMenuAppearance {
	'doc',
	'list',
	'collection',
	'add'
}

const MenuDocument: React.FC<Props> = ({ 
	props: { 
		handleClose, 
		handleClick, 
		anchorEl, 
		size, 
		altButton, 
		transformOrigin,
		appearance
	}
}) => {
	return (
		<>
			{ altButton ? 
				altButton(handleClick) 
			:
				<IconButton onClick={handleClick} size={size}>
					<MoreVert />
				</IconButton>
			}
			<Menu
				anchorEl={anchorEl}
				keepMounted
				open={!!anchorEl}
				onClose={handleClose}
				TransitionComponent={Fade}
				transformOrigin={transformOrigin}
			>
				{ appearance === EMenuAppearance.add && MenuItemsAdd(handleClose) }
				{ appearance === EMenuAppearance.doc && MenuItemsDoc(handleClose) }
				{ appearance === EMenuAppearance.list && MenuItemsList(handleClose, anchorEl) }
				{ appearance === EMenuAppearance.collection && MenuItemsCollection(handleClose) }
			</Menu>
		</>
	)
}

const MenuItemsDoc = (handleClose: (value: any) => void) => [
	<MenuItem
		key={EMenuAppearance.doc+EModal.edit}
		onClick={() => handleClose({ 
			modal: EModal.edit, 
			type: EType.doc,
			quantity: EQuantity.single
		})}
	>
		<ListItemIcon>
			<Edit fontSize="small" />
		</ListItemIcon>
		<Typography variant="inherit">Edit</Typography>
	</MenuItem>,
	<MenuItem
		key={EMenuAppearance.doc+EModal.remove}
		onClick={() => handleClose({ 
			modal: EModal.remove,
			type: EType.doc,
			quantity: EQuantity.single
		})}
	>
		<ListItemIcon>
			<Delete fontSize="small" />
		</ListItemIcon>
		<Typography variant="inherit">Delete</Typography>
	</MenuItem>
]

const MenuItemsList = (handleClose: (value: any) => void, anchorEl: any) => [
	<MenuItem
		key={EMenuAppearance.list+EModal.remove}
		onClick={() => handleClose({ 
			modal: EModal.remove,
			type: EType.doc,
			quantity: EQuantity.multiple
		})}
	>
		<ListItemIcon>
			<Delete fontSize="small" />
		</ListItemIcon>
		<Typography variant="inherit">Delete</Typography>
	</MenuItem>,
	<NestedMenuItem
		key={EMenuAppearance.list+EModal.add}
		label={
			<Grid container direction="row">
				<ListItemIcon>
					<Add fontSize="small" />
				</ListItemIcon>
				<Typography variant="inherit">Add</Typography>
			</Grid>
		}
		parentMenuOpen={!!anchorEl}
	>
		{MenuItemsAdd(handleClose) }
	</NestedMenuItem>
]

const MenuItemsCollection = (handleClose: (value: any) => void) => [
	<MenuItem
		key={EMenuAppearance.collection+EModal.edit}
		onClick={() => handleClose({ 
			modal: EModal.edit, 
			type: EType.collection,
			quantity: EQuantity.single
		})}
	>
		<ListItemIcon>
			<Edit fontSize="small" />
		</ListItemIcon>
		<Typography variant="inherit">Edit</Typography>
	</MenuItem>,
	<MenuItem
		key={EMenuAppearance.collection+EModal.remove}
		onClick={() => handleClose({ 
			modal: EModal.remove,
			type: EType.collection,
			quantity: EQuantity.single
		})}
	>
		<ListItemIcon>
			<Delete fontSize="small" />
		</ListItemIcon>
		<Typography variant="inherit">Delete</Typography>
	</MenuItem>
]

const MenuItemsAdd = (handleClose: (value: any) => void) => [	
	<MenuItem
		key={EMenuAppearance.add+EType.doc}
		onClick={() => handleClose({ 
			modal: EModal.add, 
			type: EType.doc,
			quantity: EQuantity.multiple
		})}
	>
		<ListItemIcon>
			<NoteAdd fontSize="small" />
		</ListItemIcon>
		<Typography variant="inherit">Song</Typography>
	</MenuItem>,
	<MenuItem
		key={EMenuAppearance.add+EType.collection}
		onClick={() => handleClose({ 
			modal: EModal.add, 
			type: EType.collection,
			quantity: EQuantity.single
		})}
	>
		<ListItemIcon>
			<CreateNewFolder fontSize="small" />
		</ListItemIcon>
		<Typography variant="inherit">Playlists</Typography>
	</MenuItem>
]

export default MenuDocument
