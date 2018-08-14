var React = require('react');
var PropTypes = require('prop-types');

var PlayerPreview = (props) => (
	<div>
		<div className='column'>
			<img className='avatar'
				 src={props.avatar}
				 alt={'Avatar for ' + props.username}/>
			<h2 className='username'>@{props.username}</h2>
		</div>
		{props.children}
	</div>
);

PlayerPreview.propTypes = {
	avatar: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	children: PropTypes.object.isRequired,
}

module.exports = PlayerPreview;