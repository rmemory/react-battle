var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api.js');

var SelectLanguage = (props) => {
	var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
	return (
	<ul className='languages'>
		{languages.map(language => {
			return (
				<li style={language === props.selectedLanguage ? {color: '#d0021b'}: null} 
					onClick={props.onSelect.bind(null, language)} 
					key={language}>
					{language}
				</li>
			);
		})}
	</ul>
)};

SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired,
}

var RepoGrid = (props) => {
	return (
		<ul className="popular-list">
			{props.repos.map((repo, index) => {
				return (
					<li className="popular-item" key={repo.id}>
						<div className="popular-rank">#{index + 1}</div>
						<ul className="space-list-items">
							<li key={repo.owner.avatar_url}>
								<img
									className="avatar"
									src={repo.owner.avatar_url}
									alt={'Avatar for ' + repo.owner.login} />
							</li>
							<li key={repo.html_url}>
								<a href={repo.html_url}>{repo.name}</a>
							</li>
							<li key={repo.owner.login}>@{repo.owner.login}</li>
							<li key={repo.stargazers_count}>{repo.stargazers_count} stars</li>
						</ul>
					</li>
				);
			})}
		</ul>
	)
}

RepoGrid.propTypes = {
	repos: PropTypes.array.isRequired
}

class Popular extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedLanguage: 'All',
			repos: null,
		};
		this.updateLanguage = this.updateLanguage.bind(this);
	}

	componentDidMount() {
		this.updateLanguage(this.state.selectedLanguage);
	}

	updateLanguage(language) {
		this.setState( {
			selectedLanguage: language,
			repos: null,
		});

		api.fetchPopularRepos(language).then((repos) => {
			this.setState( {
				repos,
			})
		});
	}

	render() {
		return (
			<div>
				<SelectLanguage
					onSelect={this.updateLanguage}
					selectedLanguage={this.state.selectedLanguage}
				/>
				{/* {JSON.stringify(this.state.repos, null, 2)} */}
				{
					!this.state.repos ? <p>Loading...</p> :
						<RepoGrid repos={this.state.repos} />
				}
			</div>
		);
	}
}

module.exports = Popular;