import React, { useContext } from 'react'
import Main from './Main'
import { contextPage } from '../../Providers/PageProvider'
import { contextFiles } from '../../Providers/FilesProvider'

const MainContainer: React.FC = ({ props }: any) => {
	const contextProps: any = useContext(contextPage)
	const { files, hooks: { file: { selectedFile } }, reload }: any = useContext(contextFiles)

	return <Main props={{ ...props, ...contextProps, files, selectedFile, reload }} />
}

export default MainContainer