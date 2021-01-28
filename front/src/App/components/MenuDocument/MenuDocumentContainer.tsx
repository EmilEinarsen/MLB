import React, { useContext, useState } from 'react'
import { contextEdit } from '../../../Providers/EditProvider'
import MenuDocument, { context } from './MenuDocument'
export { context } from './MenuDocument'

interface Props {
    envContext: context
}

const MenuDocumentContainer: React.FC<Props> = ({ envContext }) => {
    const { hooks: { modal: { setMode } } }: any = useContext(contextEdit)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
  
    const handleClose = (e: any) => {
        setMode(e.target.value)
        setAnchorEl(null)
    }
   
    return <MenuDocument props={{
        handleClose, handleClick, anchorEl, envContext
    }} />
}

export default MenuDocumentContainer
