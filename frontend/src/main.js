console.log('Main js loaded')
import React from 'react'
import ReactDOM from 'react-dom'

// Visual elements
import { Panel, Header } from './state/head'
import { Main, Section } from './state/body'
import Footer from './stateless/footer-views'

// Css
import './styles/styles.scss'

// Placeholder text
import Lorem from './stateless/lorem-ipsum-view'

class App extends React.Component {
	render(  ) {
		let menuItems = [
			{ name: 'Home', link: '/' }
		]
		return (
			<div className = "flexify">
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
				<Footer
					owner = "Mentor Palokaj"
				 />
			</div>
			)
	}
}


ReactDOM.render( <App />, document.getElementById('container') )