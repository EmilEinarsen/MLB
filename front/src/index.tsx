import React from 'react'
import ReactDOM from 'react-dom'
//import App from './App'
import Auth from './App/Auth'
import AuthProvider from './Providers/AuthProvider'

ReactDOM.render(<AuthProvider><Auth /></AuthProvider>, document.getElementById('root'))