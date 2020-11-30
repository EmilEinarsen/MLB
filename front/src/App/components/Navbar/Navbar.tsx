import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { Restore, Favorite, LocationOn, Folder } from '@material-ui/icons'
import './Navbar.sass'

export enum navigation {
	'recent',
	'favorite',
	'selected',
	'folder'
}

export interface Props {
	value: navigation,
	props: {
		handleChange: (e: object, value: navigation) => void,
	}
}

interface Action {
	label: string,
	value: navigation,
	icon: React.ReactNode
}

const actions: Action[] = [
	{ label: 'Recent', value: navigation.recent, icon: <Restore /> },
	{ label: "Favorites", value: navigation.favorite, icon: <Favorite /> },
	{ label: "Selected", value: navigation.selected, icon: <LocationOn /> },
	{ label: "Folder", value: navigation.folder, icon: <Folder /> }
]

const Navbar: React.FC<Props> = ({
	value,
	props: { handleChange }
}) => (
	<BottomNavigation value={value} onChange={handleChange} className="navbar">
		{ actions.map(action => <BottomNavigationAction { ...action } /> )}
	</BottomNavigation>
)

export default Navbar