import React from 'react'
import { createMuiTheme, CssBaseline, ThemeProvider as MuiThemeProvider } from '@material-ui/core'

declare module '@material-ui/core/styles/createMuiTheme' {
	interface ThemeOptions {
	  [key: string]: any 
	}
}

const theme = createMuiTheme({
	overrides: {
		MuiCssBaseline: {
			'@global': {
				body: {
					height: '100vh',
					overflow: 'hidden',
				},
				html: {
					height: '100vh',
					overflow: 'hidden',
				},
				'*': { scrollbarWidth: 'thin', },
				'::-webkit-scrollbar': {  width: '6px', height: '6px', },
			}
		}
	}
})

const ThemeProvider: React.FC = ({ children }) => {
	
	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</MuiThemeProvider>
	)
}

export default ThemeProvider