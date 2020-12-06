import React from 'react'
import ThemeProvider from '../Providers/ThemeProvider'
import FilesProvider from '../Providers/FilesProvider'
import PageProvider from '../Providers/PageProvider'
import Main from './Main'

const App: React.FC = () => (
	<ThemeProvider>
	<PageProvider>
	<FilesProvider>
		<Main />
	</FilesProvider>
	</PageProvider>
	</ThemeProvider>
)

export default App
