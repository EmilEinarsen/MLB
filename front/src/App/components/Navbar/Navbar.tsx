import React from 'react'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import './Navbar.sass'
import { navigation } from '../../../Providers/PageProvider'

export interface Props {
	value: navigation,
	props: {
		setPage: (value: navigation) => void,
		pages: Page[]
	}
}

const Navbar: React.FC<Props> = ({
	value,
	props: { 
		setPage,
		pages 
	}
}) => (
	<BottomNavigation 
		value={value} 
		onChange={(e: object, value: navigation) => setPage(value)}
		style={{ position: 'absolute', bottom: 0, width: '100vw' }}
	>
		{ pages.map(page => <BottomNavigationAction key={page.value} { ...page } /> )}
	</BottomNavigation>
)

export default Navbar

