import Navbar, { navigation } from './Navbar'
import { useState } from 'react'

const initialState = navigation.favorite

const NavbarContainer: React.FC = () => {
	const [page, setPage] = useState(initialState);

	const handleChange = (e: object, value: navigation) => setPage(value)

	return <Navbar props={{ handleChange }} value={page} />
}

export default NavbarContainer