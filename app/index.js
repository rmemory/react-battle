var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');

class App extends React.Component {
	// state

	// lifecycle event

	// UI (only one that is absolutely required)
	render() {
		return (
			<div>
				Hello world
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));