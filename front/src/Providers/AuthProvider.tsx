/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { createContext, useEffect, useRef, useState } from 'react'
import useServer, { ACTION } from '../Hooks/useServer'
import { useObject } from 'bjork_react-hookup'
import useInitialFetch from '../Hooks/useInitialFetch'
import { message } from 'antd'
import cookie from 'bjork_cookie'
import { clearData } from './serverData'

interface ContextAuth {
	authState: AUTHSTATE
	setAuthState: React.Dispatch<React.SetStateAction<AUTHSTATE>>
	submit: (value: any) => void
	refMounted: React.MutableRefObject<undefined>
	submitState: { pending: boolean, value: any, error: any }
	customErrors: any
	removeError: any
	unauthorize: () => void
	checkAuthorization: (response: any) => any
	logout: () => void
}

export enum AUTHSTATE {
	'login',
	'register',
	'authorized',
	'loading'
}

export const contextAuth = createContext<ContextAuth | undefined>(undefined)

const AuthProvider: React.FC = ({ children }) => {
	const [ loginState, executeLogin ] = useServer(ACTION.login, undefined, false)
	const [ registerState, executeRegister ] = useServer(ACTION.USER.create, undefined, false)
	const [ authState, setAuthState ] = useState<AUTHSTATE>(AUTHSTATE.loading)
	const refMounted = useRef()
	const [ customErrors, , { add: addError, removeByKey: removeError } ] = useObject({})
	const unauthorize = () => setAuthState(AUTHSTATE.login)
	const [ initialFetch, reInitialFetch ] = useInitialFetch()
	const logout = () => (clearData(), cookie.destroy('token'), localStorage.clear(), unauthorize())
	
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

	const checkAuthorization = async (response: any) => {
		response?.error?.status === 401 && unauthorize()
		return response
	}
	
	return (
		<contextAuth.Provider value={{
			authState,
			setAuthState,
			refMounted,
			submit: (values: any) => (authState === AUTHSTATE.login ? executeLogin(values) : executeRegister(values), false),
			submitState: authState === AUTHSTATE.login ? loginState : registerState,
			customErrors,
			removeError,
			unauthorize,
			checkAuthorization,
			logout
		}}>
			{children}
		</contextAuth.Provider>
	)
}

export default AuthProvider