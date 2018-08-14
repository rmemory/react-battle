var React = require('react');
var Link = require('react-router-dom').Link;
var PropTypes = require('prop-types');

var queryString = require('query-string');
var api = require('../utils/api');

var PlayerPreview = require('./PlayerPreview.jsx');
var Loading = require('./Loading.jsx');

var Profile = ({info}) => (
	<PlayerPreview 
		avatar={info.avatar_url}
		username={info.login}
	>
		<ul className='space-list-items'>
			{info.name && <li>{info.name}</li>}
			{info.location && <li>{info.location}</li>}
			{info.company && <li>{info.company}</li>}
			<li>Followers: {info.followers}</li>
			<li>Following: {info.following}</li>
			<li>Public Repos: {info.public_repos}</li>
			{info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
		</ul>
	</PlayerPreview>
);

Profile.propTypes = {
	info: PropTypes.object.isRequired
}


var Player = (props) => (
	<div>
		<h1 className='header'>
			{props.label}
		</h1>
		<h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
		<Profile info={props.profile} />
	</div>
);

Player.propTypes = {
	label: PropTypes.string.isRequired,
	score: PropTypes.number.isRequired,
	profile: PropTypes.object.isRequired,
}

class Results extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			winner: null,
			loser: null,
			error: null,
			loading: true,
		}
	}

	componentDidMount() {
		/*
		 * The search string created when pressing the 'Battle' button in the
		 * Battle component looks something like this:
		 * ?playerOneName=rmemory&playerTwoName=foobar
		 * 
		 * After parsing, players will contain an object, players, that looks 
		 * like this:
		 * 
		 * {
		 * 	playerOneName: rmemory,
		 * 	playerTwoName: foobar,
		 * }
		 */
		var players = queryString.parse(this.props.location.search);

		// Call our "battle" API which will determine a winner
		api.battle([
			players.playerOneName,
			players.playerTwoName,
		]).then(results => {
			if (results === null) {
				this.setState({
					error: 'Looks like there was a problem. Check that both user exist on github',
					loading: false,
				});
			} else {
				this.setState({
					error: null,
					winner: results[0],
					loser: results[1],
					loading: false,
				});
			}
		});
	}

	render() {
		var error = this.state.error;
		var winner = this.state.winner;
		var loser = this.state.loser;
		var loading = this.state.loading;

		if (loading === true) {
			return <Loading />
		}

		if (error) {
			return (
				<div>
					<p>{error}</p>
					<Link to="/battle">
						reset
					</Link>
				</div>
			)
		}

		return (
			<div className='row'>
				<Player
					label='Winner'
					score={winner.score}
					profile={winner.profile}
				/>
				<Player
					label='Loser'
					score={loser.score}
					profile={loser.profile}
				/>
				{/* {JSON.stringify(this.state, null, 2)} */}
			</div>
		);
	}
}

module.exports = Results;