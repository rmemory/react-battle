var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');


var config = {
	entry: './app/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index_bundle.js',
		publicPath: '/'
	},

module: {
		rules: [
			{ test: /\.(js[x]?)$/, use: 'babel-loader' },
			{ test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
		]
	},

	// Without this, a refresh will cause the browser to request from the server
	devServer: {
		historyApiFallback: true
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: 'app/index.html'
		})
	],
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
};

module.exports = config;