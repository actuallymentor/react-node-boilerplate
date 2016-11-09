console.log('Main js loaded')
import React from 'react'
import ReactDOM from 'react-dom'
import { Panel, Header } from './state/head'
import { Main, Section } from './state/body'
import './styles/styles.scss'
import Lorem from './stateless/lorem-ipsum-view'

class App extends React.Component {
	render(  ) {
		let menuItems = [
			{ name: 'Home', link: '/' }
		]
		return (
			<div>
				<header>
					<Panel
						id= "menu"
						items={menuItems}
						name="Identity"
						logo=""
						/>
					<Header
						id = "header"
						title = "Home"
						subtitle = "Welcome stranger"
					/>
				</header>
				<Main>
					<Section content = { <Lorem /> } />
				</Main>
				<footer>

				</footer>
			</div>
			)
	}
}


ReactDOM.render( <App />, document.getElementById('container') )