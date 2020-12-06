import React, { useContext } from 'react'
import Main from './Main'
import { contextPage } from '../../Providers/PageProvider'

const MainContainer: React.FC = () => {
	const props: any = useContext(contextPage)

	return <Main props={props} />
}

export default MainContainer