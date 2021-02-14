import React from 'react'
import useAsync from './useAsync'
import cookie from 'bjork_cookie'

export const baseUrl = 'http://localhost:3000/'

export const ACTION = {
    DOC: {
        create: 'doc/create',
        get: 'doc/get',
        update: 'doc/update',
        delete: 'doc/delete',
        
        get_all: 'doc/get_all',
    },
    IMG: {
        create: 'img/create',
        delete: 'img/delete'
    },
    COLLECTION: {
        create: 'collection/create',
        get: 'collection/get',
        update: 'collection/update',
        delete: 'collection/delete',
        
        get_all: 'collection/get_all',
	},
	USER: {
		create: 'user/create'
	},
	get_all: '',
	login: 'login'
}

export const postOption = (payload?: any, options: any = { JSON: true } ): object => ({
    method: 'POST',
    headers: options.JSON ? {
        'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': true,
		'auth': cookie.get('token')
    } : {
		'Access-Control-Allow-Origin': true,
		'auth': cookie.get('token')
    },
    body: options.JSON ? JSON.stringify(payload) : payload,
})

export const getOption = (): object => ({
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': true,
		'auth': cookie.get('token')
    }
})

export const actionUrl = (dest: string) => `${baseUrl}${dest}` 

export const fetchServer = async ({ dest, payload, options }: { dest: string, payload?: any, options?: any }) => {
	let response = payload || options
		? await fetch(actionUrl(dest), postOption(payload, options)) 
		: await fetch(actionUrl(dest), getOption())
		
	if(!response.ok) throw response
	try {
		const body = await response.json()
		body.token && cookie.set('token', body.token)
		return body.content ?? body
	} catch (error) {
		return response
	}
}

const useFetch = (
    dest: string, 
    payload?: any,
    immediate: boolean = true
) => {
    return useAsync(async (altPayload: any) => await fetchServer({ dest, payload: altPayload ?? payload }), immediate)
}

export default useFetch