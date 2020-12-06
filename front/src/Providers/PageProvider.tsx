import { Restore, Favorite, Description, Folder } from "@material-ui/icons"
import React, { useState, createContext, Dispatch, SetStateAction } from "react"

export enum navigation {
	'recent',
	'favorite',
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
	{ label: 'Recent', value: navigation.recent, icon: <Restore /> },
	{ label: 'Favorites', value: navigation.favorite, icon: <Favorite /> },
	{ label: 'Selected', value: navigation.selected, icon: <Description /> },
	{ label: 'Folder', value: navigation.folder, icon: <Folder /> }
]

const initialState = navigation.folder

export const contextPage = createContext<ContextPageData | undefined>(undefined)

const PageProvider = ({ children }: { children: React.ReactChild }) => {
	const [ page, setPage ] = useState<navigation>(initialState)
	
	return (
		<contextPage.Provider value={{
			page,
			setPage,
			pages
		}}>
			{children}
		</contextPage.Provider>
	)
}

export default PageProvider