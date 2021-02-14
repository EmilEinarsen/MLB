import React, { useContext } from 'react'
import { contextAuth } from '../../Providers/AuthProvider'
import { contextData } from '../../Providers/DataProvider'
import User from './User'

const UserContainer = () => {
	const { logout }: any = useContext(contextAuth)
	const { user: { username } }: any = useContext(contextData)

	const handleEmail = () => {

	}
	const handleUsername = () => {

	}
	const handlePassword = () => {

	}

	return <User {...{logout, username, handleEmail: undefined, handleUsername: undefined, handlePassword: undefined}} /> 
}

export default UserContainer
