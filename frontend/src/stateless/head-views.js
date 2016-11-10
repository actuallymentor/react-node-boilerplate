// Import react
import React from 'react'

// Define a menu rendering component that takes props
export const PanelView = ( { items, visible, toggle, name, logo } ) => {
	let menuitems = items.map ( ( item, index ) => {
		return (
			<a className = "depth menuitem" key = { index } href = { item.link}  >
				<li> {item.name} </li>
			</a>
			)
	} )
	// Fill the <nav><ul> element with the above <li>'s
	return (
		<span>
			<button id = "menu-btn"
					onClick = { toggle }
					className = { "hamburger hamburger--squeeze " +  ( visible ? "is-active" : "" )  }
					type = "button">
  				<span className = "hamburger-box">
			    <span className = "hamburger-inner"></span>
			  </span>
			</button>
			<a href = "/" className = "depth" id = "identity">
				<img
					id = "logo"
					src= { logo }
					className = { logo ? "" : "hide" } />
				 { name }
			</a>
			<nav className = { visible ? 'full absolute-show' : 'full absolute-out-right' } >
				<h3 id = "menutitle" >Navigation</h3>
				<ul>
					{menuitems}
				</ul>
			</nav>
		</span>
		)
}

export const HeaderView =  ( { id, title, subtitle } )  => (
	<div id = { id } className = "valign" >
		<h1 id = "title" className="depth nomar" >
			 { title }
		</h1>
		<p id = "subtitle" className="depth" >
			 { subtitle }
		</p>
	</div>
	)