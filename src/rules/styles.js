const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

// Define mode
const isProd = process.env.NODE_ENV === 'production';

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
			options: {
				postcssOptions: {
					plugins: [
						[
							isProd
								? cssnano({ preset: 'default' })
								: null,
							isProd
								? autoprefixer()
								: null,
						],
					],
				},
			},
		},
		{
			loader: 'sass-loader',
		},
	],
};
