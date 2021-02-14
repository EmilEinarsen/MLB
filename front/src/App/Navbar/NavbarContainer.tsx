import React, { useContext } from 'react'
import { contextPage } from '../../Providers/PageProvider'
import Navbar from './Navbar'

const NavbarContainer: React.FC = () => {
	const {
		page,
		setPage,
		pages
	}: any = useContext(contextPage)

	return <Navbar props={{ pages, setPage }} value={page} />
}

export default NavbarContainer