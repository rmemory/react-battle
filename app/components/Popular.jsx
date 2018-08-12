var React = require('react');
var PropTypes = require('prop-types');

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

class Popular extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedLanguage: 'All',
		};
		this.updateLanguage = this.updateLanguage.bind(this);
	}

	updateLanguage(language) {
		this.setState( {
			selectedLanguage: language,
		});
	}

	render() {
		return (
			<SelectLanguage
				onSelect={this.updateLanguage}
				selectedLanguage={this.state.selectedLanguage}
			/>
		);
	}
}

module.exports = Popular;