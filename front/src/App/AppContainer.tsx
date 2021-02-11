import React, { useRef, useState } from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import 'antd/dist/antd.css'

interface Props {
	refMounted: any
}

const AppContainer: React.FC<Props> = ({ refMounted }) => {
	const initial = useRef(true)
	const [ component, setComponent ] = useState<any>({ default: undefined })
	const App = component.default

	const handleResponse = async () => {
		initial.current = false
		
		const response = await import('./App')
		
		setComponent({ default: response.default})
	}

	initial.current && handleResponse()
	
	return(
		<>
			{ App && <App props={{ refMounted }} /> }
		</>
	)
}

export default AppContainer