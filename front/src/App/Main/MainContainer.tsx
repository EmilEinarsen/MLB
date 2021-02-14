import React, { useContext } from 'react'
import { contextPage } from '../../Providers/PageProvider'
import Main from './Main'

const MainContainer: React.FC = ({ props }: any) => {
	const { page }: any = useContext(contextPage)

	return <Main page={page} />
}

export default MainContainer