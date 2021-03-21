import React, { createContext, useCallback, useEffect, useState } from "react"
import { Person, Description, Folder } from "@material-ui/icons"
import useHistory from "../Hooks/useHistory/useHistory"
import PATH from "../Hooks/useHistory/PATH"

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
		pages: Page[]
	}
}

const pages: Page[] = [
	{ label: 'Folder', value: navigation.folder, icon: <Folder /> },
	{ label: 'Song', value: navigation.selected, icon: <Description /> },
	{ label: 'User', value: navigation.user, icon: <Person /> },
]

const initialState = navigation.folder

export const contextPage = createContext<ContextPageData>({
	page: initialState,
	pages: []
})



const PageProvider = ({ children }: { children: React.ReactChild }) => {
	const { current } = useHistory()
	
	const getPage = () =>
		current.includes(PATH.USER) ? navigation.user
			: current.includes(PATH.SONG.replace('/:songId','')) ? navigation.selected
			: navigation.folder
	
		
	const [ page, setPage ] = useState(getPage())

	useEffect(() => {
		setPage(getPage())
	}, [current])
		
	
	return (
		<contextPage.Provider value={{
			page,
			pages
		}}>
			{children}
		</contextPage.Provider>
	)
}

export default PageProvider