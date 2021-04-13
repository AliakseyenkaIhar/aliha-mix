const path = require('path');

const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const svgToMiniDataURI = require('mini-svg-data-uri');

const { THEME: themeName } = process.env;
const themeFolder = `web/app/themes/${themeName}`;

module.exports = {
	test: /\.svg$/,
	include: path.resolve(themeFolder, 'resources/assets/icons'),
	type: 'asset/inline',
	generator: {
		dataUrl: content => svgToMiniDataURI(content.toString())
	},
	use: [
		{
			loader: ImageMinimizerPlugin.loader,
			options: {
				severityError: 'warning',
				minimizerOptions: {
					plugins: [
						['svgo', { plugins: [{ removeViewBox: false }] } ],
					],
				},
			},
		},
	],
};
