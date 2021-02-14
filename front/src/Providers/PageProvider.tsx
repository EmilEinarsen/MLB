import React, { createContext, Dispatch, SetStateAction } from "react"
import { Person, Description, Folder } from "@material-ui/icons"
import { useStorage } from 'bjork_react-hookup'

export enum navigation {
	'user',
	'selected',
	'folder'
}

declare global {
	interface Page {
		label: string,
		value: navigation,
		icon: React.ReactNode
	}

	interface ContextPageData {
		page: navigation,
		setPage: Dispatch<SetStateAction<navigation>>,
		pages: Page[]
	}
}

const pages: Page[] = [
	{ label: 'Playlists', value: navigation.folder, icon: <Folder /> },
	{ label: 'Song', value: navigation.selected, icon: <Description /> },
	{ label: 'User', value: navigation.user, icon: <Person /> },
]

const initialState = navigation.folder

export const contextPage = createContext<ContextPageData>({
	page: initialState,
	setPage: () => {},
	pages: []
})

const PageProvider = ({ children }: { children: React.ReactChild }) => {
	const [ page, setPage ] = useStorage('local', 'page', initialState)
	
	return (
		<contextPage.Provider value={{
			page: +page,
			setPage,
			pages
		}}>
			{children}
		</contextPage.Provider>
	)
}

export default PageProvider