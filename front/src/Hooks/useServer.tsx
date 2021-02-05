import React from 'react'
import useAsync from './useAsync'

const baseUrl = 'http://localhost:3000/'

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
    get_all: '',
}

const postOption = (payload: any, options?: any): object => (options ? options : {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true 
    },
    mode : 'cors',
    body: JSON.stringify(payload),
})

export const fetchServer = async ({ dest, payload, options }: { dest: string, payload?: any, options?: any }) => {
    try {
        let response = payload || options
            ? await fetch(`${baseUrl}${dest}`, postOption(payload, options)) 
            : await fetch(`${baseUrl}${dest}`)
        return await response.json()
    } catch (error) {
        return error
    }
}

const useFetch = (
    dest: string, 
    payload?: any,
    immediate: boolean = true
) => {
    return useAsync(() => fetchServer({ dest, payload }), immediate)
}

export default useFetch