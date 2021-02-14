import { PopoverOrigin } from '@material-ui/core/Popover'
import React, { useContext, useState } from 'react'
import { contextData } from '../../../Providers/DataProvider'
import { contextEdit } from '../../../Providers/EditProvider'
import MenuDocument, { EMenuAppearance } from './MenuDocument'

interface Props {
    appearance: EMenuAppearance
    size?: 'small' | 'medium'
	altButton?: (onClick: any) => JSX.Element
	transformOrigin?: PopoverOrigin
	id?: string
}

const MenuDocumentContainer: React.FC<Props> = ({ 
	appearance, 
	size,
	altButton,
	transformOrigin,
	id
}) => {
    const { mode: [ , setMode ] }: any = useContext(contextEdit)
	const { hooks: { collection: { setSelectedCollection } } }: any = useContext(contextData)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleClick = (event: any) =>
        setAnchorEl(event.currentTarget)
  
    const handleClose = (value: any) => {
        setMode(value)
		id && setSelectedCollection(id)
		setAnchorEl(null)
    }
   
    return <MenuDocument props={{
		handleClose, 
		handleClick, 
		anchorEl, 
		appearance, 
		size, 
		altButton, 
		transformOrigin
    }} />
}

export default MenuDocumentContainer
