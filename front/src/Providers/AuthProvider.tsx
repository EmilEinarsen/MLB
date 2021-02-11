/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { createContext, useEffect, useRef, useState } from 'react'
import useServer, { ACTION } from '../Hooks/useServer'
import { useStorage, useObject } from 'bjork_react-hookup'
import useInitialFetch from '../Hooks/useInitialFetch'
import { message } from 'antd'
import cookie from 'bjork_cookie'

interface ContextAuth {
	authState: AUTHSTATE
	setAuthState: React.Dispatch<React.SetStateAction<AUTHSTATE>>
	submit: (value: any) => void
	refMounted: React.MutableRefObject<undefined>
	submitState: { pending: boolean, value: any, error: any }
	customErrors: any
	removeError: any
}

export enum AUTHSTATE {
	'login',
	'register',
	'authorized',
	'loading'
}

export const contextAuth = createContext<ContextAuth | undefined>(undefined)

const AuthProvider: React.FC = ({ children }) => {
	const [ initialFetch, reInitialFetch ] = useInitialFetch()
	const [ loginState, executeLogin ] = useServer(ACTION.login, undefined, false)
	const [ registerState, executeRegister ] = useServer(ACTION.USER.create, undefined, false)
	const [ authState, setAuthState ] = useState<AUTHSTATE>(AUTHSTATE.loading)
	const refMounted = useRef()
	const [ customErrors, , { add: addError, removeByKey: removeError } ] = useObject({})
	
	useEffect(() => {
		if(authState === AUTHSTATE.authorized || !registerState) return
		registerState.pending && message.loading({ content: 'Pending...', key: 'register' })
		registerState.value && (
			message.success({ content: 'Successful!', key: 'register' }),
			setAuthState(AUTHSTATE.login)
		)
		registerState.error && (
			(async () => addError(await registerState.error.json()))(),
			message.error({ content: 'Error!', key: 'register' })
		)
	}, [ registerState ])

	useEffect(() => {
		if(authState === AUTHSTATE.authorized) return
		loginState?.value && (
			async () => (
				setAuthState(AUTHSTATE.loading),
				cookie.set('token', loginState.value.token),
				reInitialFetch()
			)
		)()
	}, [ loginState ])

	useEffect(() => {
		if(initialFetch.pending) return
		initialFetch.error && setAuthState(AUTHSTATE.login)
		initialFetch.value && setAuthState(AUTHSTATE.authorized)
	}, [ initialFetch ])
	
	useEffect(() => {
		authState === AUTHSTATE.loading && (refMounted.current = undefined)
	}, [authState])
	
	return (
		<contextAuth.Provider value={{
			authState,
			setAuthState,
			refMounted,
			submit: (values) => (authState === AUTHSTATE.login ? executeLogin(values) : executeRegister(values), false),
			submitState: authState === AUTHSTATE.login ? loginState : registerState,
			customErrors,
			removeError
		}}>
			{children}
		</contextAuth.Provider>
	)
}

export default AuthProvider