import React from 'react'
import { MenuS, HeaderS } from '../stateless/head'

// The menu logic
export class Menu extends React.Component {
	constructor ( props ) {
		super ( props )
		this.state = {
			visible: false
		}
		this.toggle = this.toggle.bind( this )
	}
	toggle(  ) {
		if ( this.state.visible ) {
			this.setState( {visible: false} )
		} else {
			this.setState( {visible: true} )
		}
	}
	render(  ) {
		return (
			<div>
				<MenuS
					toggle = {this.toggle}
					visible = {this.state.visible}
					items = {this.props.items} />
			</div> )
	}
}


// The header logic
export class Header extends React.Component {
	render(  ) {
		return <div>I am a header</div>
	}
}