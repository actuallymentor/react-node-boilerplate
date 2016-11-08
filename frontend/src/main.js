console.log('Main js loaded')
import React from 'react'
import ReactDOM from 'react-dom'
import { Menu, Header } from './state/head.js'
import './styles/styles.scss'

class App extends React.Component {
	render(  ) {
		let menuItems = [
			{ name: 'Home', link: '/' }
		]
		return (
			<header>
				<Menu items={menuItems} />
				<Header />
			</header>
			)
	}
}


ReactDOM.render( <App />, document.getElementById('container') )