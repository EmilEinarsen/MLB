import React from 'react'
import App from './App'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import 'antd/dist/antd.css'

interface Props {
	refMounted: any
}

const AppContainer: React.FC<Props> = (props) => {
	
	return <App props={props} />
}

export default AppContainer