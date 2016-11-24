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
		this.loginPanel = this.loginPanel.bind( this )
		this.menuPanel = this.menuPanel.bind( this )
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
	// Panel login activation
	loginPanel (  ) {
		this.setState ( { action: "login" } )
	}
	// Menu panel activation
	menuPanel (  ) {
		this.setState ( { action: "menu" } )
	}
	// Rendering of panel
	render(  ) {
		// Decide what to show in the panel
		let panelContent
		switch ( this.state.action ) {
			case "register":
				panelContent = <AccountView action = "register" reset = { this.menuPanel } />
				break
			case "login":
				panelContent = <AccountView action = "login" reset = { this.menuPanel } />
				break
			default:
				panelContent = (
					<MenuView
						links 	 = { this.state.menuLinks }
						register = { this.registerPanel }
						login 	 = { this.loginPanel }
					/>
				)
			break
		}
		// Display the panel
		return (
			<div id = { this.props.id }>
				<PanelView
					toggle 	= { this.toggle }
					visible = { this.state.visible }
					action  = { this.state.action }
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