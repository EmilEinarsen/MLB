import React from 'react'
import { Fade, IconButton, Menu, MenuItem, PopoverOrigin, Typography } from '@material-ui/core'
import { Delete, Edit, MoreVert, Folder, Description } from '@material-ui/icons'
import { modalModes } from '../../../Providers/EditProvider'
import './MenuDocument.sass'

interface Props {
    props: {
        handleClose: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
        handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
        anchorEl: null | HTMLElement
        envContext: context
		size?: 'small' | 'medium'
		altButton?: (onClick: (event: React.MouseEvent<HTMLButtonElement>) => void) => JSX.Element
		transformOrigin?: PopoverOrigin
    }
}

export enum context {
    'document',
    'list',
	'collection',
	'add'
}

const MenuDocument: React.FC<Props> = ({ 
	props: { handleClose, handleClick, anchorEl, envContext, size, altButton, transformOrigin }
}) => (
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
            { envContext !== context.add ? 
				[
					(envContext === context.document || envContext === context.collection) &&
					<MenuItem key={modalModes.edit} onClick={handleClose} value={modalModes.edit}>
						<Typography color="textSecondary" style={{ margin: '0 .5em 0 0', pointerEvents: 'none' }}><Edit fontSize="inherit" /></Typography>
						Edit
					</MenuItem>,
					
					true && 
						<MenuItem
							key={modalModes.remove}
							onClick={handleClose} 
							value={ envContext !== context.list ? modalModes.remove : modalModes.remove_mult }>
							<Typography color="textSecondary" style={{ margin: '0 .5em 0 0', pointerEvents: 'none' }}><Delete fontSize="inherit" /></Typography>
							Delete
						</MenuItem>
				]
			:
				[	
					<MenuItem key={modalModes.add_doc} onClick={handleClose} value={modalModes.add_doc}>
						<Typography color="textSecondary" style={{ margin: '0 .5em 0 0', pointerEvents: 'none' }}><Description fontSize="inherit" /></Typography>
						Document
					</MenuItem>,
					<MenuItem key={modalModes.add_collection} onClick={handleClose} value={modalModes.add_collection}>
						<Typography color="textSecondary" style={{ margin: '0 .5em 0 0', pointerEvents: 'none' }}><Folder fontSize="inherit" /></Typography>
						Folder
					</MenuItem>
					
				]
			}
        </Menu>
    </>
)

export default MenuDocument
