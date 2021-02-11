import React, { useContext } from 'react'
import { AUTHSTATE, contextAuth } from '../../Providers/AuthProvider'
import Auth from './Auth'

const AuthContainer = () => {
	const { 
		authState,
		setAuthState, 
		submit,
		submitState,
		refMounted,
		customErrors,
		removeError
	}: any = useContext(contextAuth)

	const toggleForm = () => setAuthState(authState === AUTHSTATE.login ? AUTHSTATE.register : AUTHSTATE.login)
	
	return <Auth
		authState={authState}
		toggleForm={toggleForm}
		handleFinish={submit}
		submitState={submitState}
		refMounted={refMounted}
		error={{ customErrors, removeError }}
	/>
}

export default AuthContainer
