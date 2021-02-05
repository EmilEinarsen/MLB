import React, { useContext } from 'react'
import Main from './Main'
import { contextPage } from '../../Providers/PageProvider'
import { contextData } from '../../Providers/DataProvider'

const MainContainer: React.FC = ({ props }: any) => {
	const contextProps: any = useContext(contextPage)
	const { files, hooks: { file: { selectedFile } }, reload }: any = useContext(contextData)

	return <Main props={{ ...props, ...contextProps, files, selectedFile, reload }} />
}

export default MainContainer