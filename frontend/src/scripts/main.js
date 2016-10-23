console.log('Main checking in')
import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import NavigationAppBar from './appbar.js'
require("../styles/styles.scss")

const App = () => (
	<MuiThemeProvider>
		<header>
			<NavigationAppBar />
		</header>
	</MuiThemeProvider>
	)

ReactDOM.render(
	<App />,
	document.getElementById('container')
	);