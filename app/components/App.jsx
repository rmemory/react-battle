var React = require('react');
var ReactRouter = require ('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

var Nav = require('./Nav.jsx');
var Home = require('./Home.jsx');
var Battle = require('./Battle.jsx');
var Popular = require('./Popular.jsx');
var Results = require('./Results.jsx');

class App extends React.Component {
	// state

	// lifecycle event

	// UI (only one that is absolutely required)
	render() {
		return (
			<Router>
				<div className='container'>
					<Nav />
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/battle' component={Battle} />
						<Route path='/battle/results' component={Results} />
						<Route path='/popular' component={Popular} />
						<Route render={function () {
							return <p>Not Found</p>
						}} />
					</Switch>
				</div>
			</Router>
		)
	}
}

module.exports = App;