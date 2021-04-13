const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	test: /font\.js$/i,
	use: [
		MiniCssExtractPlugin.loader,
		{
			loader: 'css-loader',
			options: {
				url: false,
			},
		},
		{
			loader: 'webfonts-loader',
			options: {
				publicPath: '../',
			},
		},
	],
};
