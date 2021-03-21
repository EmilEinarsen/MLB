import React from 'react'
import ReactDOM from 'react-dom'
import Auth from './App/Auth'
import AuthProvider from './Providers/AuthProvider'
import HistoryProvider from './Providers/HistoryProvider'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render((
	<HistoryProvider>
		<AuthProvider>
			<Auth />
		</AuthProvider>
	</HistoryProvider>
), document.getElementById('root'))

registerServiceWorker()