import React from 'react'
import { navigation } from '../../../Providers/PageProvider'
import Navbar from './Navbar'

interface Props {
	props: {
		page: navigation,
		setPage: () => void,
		pages: Page[]
	}
}

const NavbarContainer: React.FC<Props> = ({ 
	props: { 
		page, 
		setPage, 
		pages 
	}
}) => {

	return <Navbar props={{ pages, setPage }} value={page} />
}

export default NavbarContainer