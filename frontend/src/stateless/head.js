// Import react
import React from 'react'

// Define a menu rendering component that takes props
export const MenuS = ( { items, visible, toggle } ) => {
	let menuitems = items.map ( ( item, index ) => {
		return (
			<a key = { index } href = { item.link}  >
				<li> {item.name} </li>
			</a>
			)
	} )
	// Fill the <nav><ul> element with the above <li>'s
	return (
		<div>
			<button onClick = { toggle } > Show </button>
			<nav className = { visible ? 'show' : 'hide' } >
				<ul> {menuitems} </ul>
			</nav>
		</div>)
}

export const HeaderS = props => ( <div> I am a header </div> )