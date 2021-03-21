/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { createContext, useEffect, useRef, useState } from 'react'
import { message } from 'antd'
import { useObject } from 'bjork_react-hookup'
import cookie from 'bjork_cookie'
import useServer, { ACTION } from '../Hooks/useServer'
import useInitialFetch from '../Hooks/useInitialFetch'
import { clearData } from './serverData'
import useHistory from '../Hooks/useHistory/useHistory'
import PATH from '../Hooks/useHistory/PATH'

interface ContextAuth {
	authState: EAuthState
	setAuthState: (state: EAuthState) => void
	submit: (value: any) => void
	refMounted: React.MutableRefObject<undefined>
	submitState: { pending: boolean, value: any, error: any }
	customErrors: any
	removeError: any
	unauthorize: () => void
	checkAuthorization: (response: any) => any
	logout: () => void
}

export enum EAuthState {
	'login',
	'register',
	'authorized',
	'loading'
}

export const contextAuth = createContext<ContextAuth | undefined>(undefined)

const AuthProvider: React.FC = ({ children }) => {
	const history = useHistory()
	const [ authState, setAuthState ] = useState<EAuthState>(EAuthState.loading)
	const handleAuthState = (state: EAuthState) => {
		history.push(
			state === EAuthState.authorized ? PATH.PLAYLIST.replace(
				':songId',
				history.current.split('/').pop() ?? ''
			)
			: state === EAuthState.register ? PATH.REGISTER
			: PATH.LOGIN
		)
		setAuthState(state)
	}
	const refMounted = useRef()
	
	const [ initialFetch, reInitialFetch ] = useInitialFetch()
	const [ loginState, executeLogin ] = useServer(ACTION.login, undefined, false)
	const [ registerState, executeRegister ] = useServer(ACTION.USER.create, undefined, false)
	const [ customErrors, , { add: addError, removeByKey: removeError } ] = useObject({})

	const handleSubmit = (values: any) => authState === EAuthState.login ? executeLogin(values) : executeRegister(values)
	const submitState = authState === EAuthState.login ? loginState : registerState


	useEffect(() => {
		if(authState === EAuthState.authorized || !registerState) return
		registerState.pending && message.loading({ content: 'Pending...', key: 'register' })
		registerState.value && (
			message.success({ content: 'Successful!', key: 'register' }),
			handleAuthState(EAuthState.login)
		)
		registerState.error && (
			(async () => addError(await registerState.error.json()))(),
			message.error({ content: 'Error!', key: 'register' })
		)
	}, [ registerState ])

	useEffect(() => {
		if(authState === EAuthState.authorized) return
		loginState?.value && (
			async () => (
				handleAuthState(EAuthState.loading),
				reInitialFetch()
			)
		)()
	}, [ loginState ])

	useEffect(() => {
		if(initialFetch.pending) return
		initialFetch.error && handleAuthState(
			history.current === PATH.REGISTER ? EAuthState.register : EAuthState.login
		)
		initialFetch.value && handleAuthState(EAuthState.authorized)
	}, [ initialFetch ])
	
	useEffect(() => {
		authState === EAuthState.loading && (refMounted.current = undefined)
	}, [authState])

	const unauthorize = () => handleAuthState(EAuthState.login)

	const logout = () => (clearData(), cookie.destroy('token'), unauthorize())

	const checkAuthorization = async (response: any) => {
		response?.error?.status === 401 && unauthorize()
		return response
	}
	
	return (
		<contextAuth.Provider value={{
			authState,
			setAuthState: handleAuthState,
			refMounted,
			submit: handleSubmit,
			submitState,
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