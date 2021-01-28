import React from 'react'
import { Fade, IconButton, Menu, MenuItem, Typography } from '@material-ui/core'
import { Delete, Edit, MoreVert } from '@material-ui/icons'
import { modalModes } from '../../../Providers/EditProvider'
import './MenuDocument.sass'

interface Props {
    props: {
        handleClose: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
        handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
        anchorEl: null | HTMLElement
        envContext: context
    }
}

export enum context {
    'document',
    'list'
}

const MenuDocument: React.FC<Props> = ({ 
    props: { handleClose, handleClick, anchorEl, envContext }
}) => (
    <>
        <IconButton onClick={handleClick}>
            <MoreVert />
        </IconButton>
        <Menu
            anchorEl={anchorEl}
            keepMounted
            open={!!anchorEl}
            onClose={handleClose}
            TransitionComponent={Fade}
        >
            {
                envContext === context.document && 
                <MenuItem onClick={handleClose} value={modalModes.edit}>
                    <Typography color="textSecondary" style={{ margin: '0 .5em 0 0', pointerEvents: 'none' }}><Edit fontSize="inherit" /></Typography>
                    Edit
                </MenuItem>
            }
            {
                true && 
                <MenuItem 
                    onClick={handleClose} 
                    value={ envContext === context.document ? modalModes.remove : modalModes.remove_mult }>
                    <Typography color="textSecondary" style={{ margin: '0 .5em 0 0', pointerEvents: 'none' }}><Delete fontSize="inherit" /></Typography>
                    Delete
                </MenuItem>
            }
        </Menu>
    </>
)

export default MenuDocument
