import React, { useEffect, useRef, useState } from 'react'
import useBoolean from 'bjork_react-hookup/core/useBoolean'
import useInitialFetch from '../Hooks/useInitialFetch'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import LoadingScreen from './LoadingScreen'
import ErrorPage from './ErrorPage'

const AppContainer = () => {
	const initial = useRef(true)
	
	const state = useInitialFetch()

	const [ component, setComponent ] = useState<any>({ default: undefined })
	
	const isMounted = useRef()

	const [ loading, , { setFalse } ] = useBoolean(true)

	useEffect(() => {
		!state.pending && isMounted.current && setFalse()
	}, [setFalse, state.pending])

	const handleResponse = async () => {
		initial.current = false
		
		const response = await import('./App')
		
		setComponent({ default: response.default})
	}

	initial.current && state.value && handleResponse()
	
	const App = component.default
	
	return(
		<>
			<LoadingScreen props={{ loading }} />
			{ state.value && App && <App props={{ isMounted }} /> }
			{ state.error && <ErrorPage props={{ isMounted }} />}
		</>
	)
}

export default AppContainer