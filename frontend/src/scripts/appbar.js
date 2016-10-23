console.log('Appbar checking in')
import React from 'react'
import ReactDOM from 'react-dom'
import { AppBar, Drawer } from 'material-ui'
// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

export default class NavigationAppBar extends React.Component {
    render() {
    	return (
    		<AppBar title="Amazing App">
    		</AppBar>
    		)
    }
}