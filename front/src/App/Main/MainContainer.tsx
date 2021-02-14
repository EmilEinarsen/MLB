import React, { useContext } from 'react'
import Main from './Main'
import { contextPage } from '../../Providers/PageProvider'

const MainContainer: React.FC = ({ props }: any) => {
	const { page }: any = useContext(contextPage)

	return <Main page={page} />
}

export default MainContainer