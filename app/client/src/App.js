import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline/index.js';
import Appbar from './components/Appbar.js';
import Routes from './routes/index';
import './App.css';

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<CssBaseline />
				<Appbar />
				<Routes />
			</React.Fragment>
		);
	}
}

export default App;
