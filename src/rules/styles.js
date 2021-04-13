const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	test: /\.(s?)(a|c)ss$/i,
	use: [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
				publicPath: '../',
			},
		},
		{
			loader: 'css-loader',
		},
		{
			loader: 'postcss-loader',
			// options: {
			// 	postcssOptions: {
			// 		config: postcssConfig,
			// 	},
			// },
		},
		{
			loader: 'sass-loader',
		},
	],
};
