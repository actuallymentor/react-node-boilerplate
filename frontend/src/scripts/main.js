console.log('Main js loaded')
import React from 'react'
import ReactDOM from 'react-dom'
import { Menu, Header } from './modules/head.js'
import '../styles/styles.scss'

class App extends React.Component {
	render(  ) {
		return (
			<header>
				<Menu />
				<Header />
			</header>
			)
	}
}


ReactDOM.render( <App />, document.getElementById('container') )