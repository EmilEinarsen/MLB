import { PopoverOrigin } from '@material-ui/core/Popover'
import React, { useContext, useState } from 'react'
import { contextEdit } from '../../../Providers/EditProvider'
import MenuDocument, { context } from './MenuDocument'
export { context } from './MenuDocument'

interface Props {
    envContext: context
    size?: 'small' | 'medium'
	id?: string
	altButton?: (onClick: any) => JSX.Element
	transformOrigin?: PopoverOrigin
}

const MenuDocumentContainer: React.FC<Props> = ({ 
	envContext, 
	size, 
	id, 
	altButton,
	transformOrigin
}) => {
    const { hooks: { modal: { setMode } }, handleSetCollection }: any = useContext(contextEdit)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
  
    const handleClose = (e: any) => {
        setMode(e.target.value)
        handleSetCollection(id)
        setAnchorEl(null)
    }
   
    return <MenuDocument props={{
		handleClose, 
		handleClick, 
		anchorEl, 
		envContext, 
		size, 
		altButton, 
		transformOrigin
    }} />
}

export default MenuDocumentContainer
