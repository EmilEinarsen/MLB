import React, { useContext } from 'react'
import { contextAuth } from '../../Providers/AuthProvider'
import { contextData } from '../../Providers/DataProvider'
import User from './User'

const UserContainer = () => {
	const { logout }: any = useContext(contextAuth)
	const { user: { username } }: any = useContext(contextData)

	return <User {...{logout, username}} /> 
}

export default UserContainer
