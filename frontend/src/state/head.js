import React from 'react'
import { PanelView, HeaderView, MenuView, AccountView } from '../stateless/head-views'

// The menu logic

export class Panel extends React.Component {
	// Constructor setting default state
	constructor ( props ) {
		super ( props )
		// Set the state objects
		this.state = {
			visible: false,
			action: "menu",
			menuLinks: [
				{ name: 'Home', link: '/' }
			]
		}

		// Bind the functions for use in the render
		this.toggle = this.toggle.bind( this )
		this.registerPanel = this.registerPanel.bind( this )
	}
	// Panel visibility toggle
	toggle(  ) {
		if ( this.state.visible ) {
			this.setState ( { visible: false, action: 'menu' } )
		} else {
			this.setState ( { visible: true } )
		}
	}
	// Panel registration activation
	registerPanel (  ) {
		this.setState ( { action: "register" } )
	}

	// Rendering of panel
	render(  ) {
		// Decide what to show in the panel
		let panelContent
		switch ( this.state.action ) {
			case "register":
				panelContent = <AccountView />
				break
			default:
				panelContent = (
					<MenuView
						links = { this.state.menuLinks }
						register = { this.registerPanel }
					/>
				)
		}
		// Display the panel
		return (
			<div id = { this.props.id }>
				<PanelView
					toggle 	= { this.toggle }
					visible = { this.state.visible }
				 >
				 	{ panelContent }
				 </PanelView>
			</div>
		)
	}
}


// The header logic
export class Header extends React.Component {
	render(  ) {
		return  (
			<HeaderView
				id 		 = { this.props.id }
				title 	 = { this.props.title }
				subtitle = { this.props.subtitle }
				name 	 = {this.props.name }
				logo 	 = {this.props.logo }
		 	/>
		 )
	}
}