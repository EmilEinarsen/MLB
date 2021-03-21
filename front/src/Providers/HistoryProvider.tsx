import React, { createContext, useLayoutEffect, useState } from 'react'

interface History {
	current: string,
	push: Push
}

interface Push {
	(path: string, title?: string): void
}

const initialCurrent = window.location.pathname

export const contextHistory = createContext<History>({
	current: initialCurrent,
	push: () => {}
}) 

const HistoryProvider: React.FC = ({ children }) => {
	const [ current, setCurrent ] = useState<string>(initialCurrent)
	
	const push: Push = (path, title) => {
		window.history.pushState(null, '', path)
		title && (document.title = title) 
		setCurrent(path)
	}

	useLayoutEffect(() => {
		window.addEventListener('popstate', () => setCurrent(window.location.pathname))

		return () => {
			window.removeEventListener('popstate', () => setCurrent(window.location.pathname))
		}
	})

	return (
		<contextHistory.Provider value={{
			current,
			push
		}}>
			{ children }
		</contextHistory.Provider>
	)
}

export default HistoryProvider
