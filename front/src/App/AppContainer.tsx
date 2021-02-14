import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import 'antd/dist/antd.css'
import App from './App'

interface Props {
	refMounted: any
}

const AppContainer: React.FC<Props> = (props) => {
	
	return <App props={props} />
}

export default AppContainer