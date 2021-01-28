import React from 'react'
import ThemeProvider from '../Providers/ThemeProvider'
import FilesProvider from '../Providers/FilesProvider'
import PageProvider from '../Providers/PageProvider'
import EditProvider from '../Providers/EditProvider'
import Main from './Main'

const App: React.FC = bind =>
	<ThemeProvider>
		<PageProvider>
			<FilesProvider>
				<EditProvider>

					<Main { ...bind } />

				</EditProvider>
			</FilesProvider>
		</PageProvider>
	</ThemeProvider>

export default App
