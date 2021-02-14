import { useEffect, useReducer, useCallback } from 'react'

const ACTION = {
	FETCH: 'FETCH',
	RESPONSE: 'RESPONSE',
	RESET: 'RESET'
}

const fetchReducer = (state, action) => {
	// eslint-disable-next-line default-case
	switch (action.type) {
	case ACTION.FETCH: 
		return {
			...initialState,
			pending: true
		}
	case ACTION.RESPONSE: 
		return {
			...state,
			...action.payload,
			pending: false,
		}
	case ACTION.RESET: 
		return { 
			...initialState 
		}
	}
	
}

const initialState = {
	pending:  false,
	value:  null,
	error: null,
}

/**
 * useAsync hook - Returns an array of two elements: state and execute. 
 * * _state_ {object}: contains three properties: pending, value and error.
 * * _execute_ {function}: that executes the provided function _asyncFunction_ and updates the state, depending on resolve or reject
 * 
 * @param {function} asyncFunction - Function to be executed on dispatch
 * @param {boolean=true} [immediate] - Determines whether or not _asyncFunction_ should be executed immediately, default true
 * @return {array} [ {object} state, {function} execute ]
 */
const useAsync = (asyncFunction, immediate = true) => {
	const [ state, dispatch ] = useReducer(fetchReducer, initialState)
	
	const execute = useCallback(async (value) => {
		dispatch({type: ACTION.FETCH})

		try {

			let response = await asyncFunction(value)
			dispatch({type: ACTION.RESPONSE, payload: {value: response}})

		} catch (error) {

			dispatch({type: ACTION.RESPONSE, payload: {error}})

		}
	},[asyncFunction])

	useEffect(() => {
		if (immediate) execute()
	}, [execute, immediate])

	return [
		state,
		execute,
		{
			reset: () => dispatch({type: ACTION.RESET })
		}
	]
}

export default useAsync