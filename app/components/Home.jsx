var React = require('react');
var Link = require('react-router-dom').Link;

class Home extends React.Component {
	render() {
		return (
			<div className='home-container'>
				<h1>A github battle</h1>
				<Link className='button' to='/button'>
					Battle
				</Link>
			</div>
		);
	}
}

module.exports = Home;