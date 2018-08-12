var React = require('react');
var Popular = require('./Popular.jsx');

class App extends React.Component {
	// state

	// lifecycle event

	// UI (only one that is absolutely required)
	render() {
		return (
			<div className='container'>
				<Popular />
			</div>
		)
	}
}

module.exports = App;