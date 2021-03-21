import React, { useContext } from 'react'
import PATH from '../../Hooks/useHistory/PATH'
import useHistory from '../../Hooks/useHistory/useHistory'
import { contextData } from '../../Providers/DataProvider'
import { contextPage, navigation } from '../../Providers/PageProvider'
import Navbar from './Navbar'

const NavbarContainer: React.FC = () => {
	const history = useHistory()
	const { page, pages }: any = useContext(contextPage)
	const { hooks: { file: { selectedFile } } }: any = useContext(contextData)

	const songId = selectedFile ?? ''

	const setPage = (value: navigation) => {
		value === navigation.selected ? history.push(PATH.SONG.replace(':songId', songId))
		: value === navigation.user ? history.push(PATH.USER)
		: history.push(PATH.PLAYLIST.replace(':songId', songId))
	}

	return <Navbar props={{ pages, setPage }} value={page} />
}

export default NavbarContainer