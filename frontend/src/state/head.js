import React from 'react'
import { PanelView, HeaderView } from '../stateless/head-views'

// The menu logic
export class Panel extends React.Component {
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
			<div id = {this.props.id}>
				<PanelView
					toggle = {this.toggle}
					visible = {this.state.visible}
					items = {this.props.items}
					name =  {this.props.name}
					logo =  {this.props.logo}
				 />
			</div> )
	}
}


// The header logic
export class Header extends React.Component {
	render(  ) {
		return  (
			<HeaderView
				id =  { this.props.id }
				title = { this.props.title }
				subtitle = { this.props.subtitle }
		 	/>
		 )
	}
}