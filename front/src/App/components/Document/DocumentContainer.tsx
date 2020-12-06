import React from 'react'
import Document from './Document'

interface Props {
	file: Doc | undefined
}

const DocumentContainer: React.FC<Props> = bind => {

	return <Document { ...bind } />
}

export default DocumentContainer
