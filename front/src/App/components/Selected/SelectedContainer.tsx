import React, { useContext } from 'react'
import { contextEdit, modalModes } from '../../../Providers/EditProvider'
import Selected from './Selected'

interface Props {
    file: Doc | undefined
    props: any
}

const SelectedContainer: React.FC<Props> = bind => {
    const 
        { hooks: { modal: { setMode } } }: any = useContext(contextEdit),
        editDoc = () => setMode(modalModes.edit)

    return <Selected { ...bind } props={{ editDoc }} />
}

export default SelectedContainer
