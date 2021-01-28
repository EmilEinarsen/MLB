import React from 'react'
import Document from '../Document'
import { Box } from '@material-ui/core'

interface Props {
    file: Doc | undefined
    props: any
}

const Selected: React.FC<Props> = ({ 
    file,
    props
 }) => (
    <Box className="folder-document" >
        <Document file={file} style={{ padding: '20px' }} props={props} />
    </Box>
)

export default Selected
