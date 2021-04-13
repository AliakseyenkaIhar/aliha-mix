const path = require('path');

const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const { THEME: themeName } = process.env;
const themeFolder = `web/app/themes/${themeName}`;

module.exports = {
	test: /\.(png|jp(e?)g|gif|ico)$/,
	include: path.resolve(themeFolder, 'resources/assets/img'),
	type: 'asset',
	generator: {
		filename: 'img/[name].[hash:8].[ext]'
	},
	parser: {
		dataUrlCondition: {
			maxSize: 8 * 1024, // 8kb
		},
	},
	use: [
		{
			loader: ImageMinimizerPlugin.loader,
			options: {
				severityError: 'warning',
				minimizerOptions: {
					plugins: [
						['gifsicle', { interlaced: true, optimizationLevel: 3 }],
						['mozjpeg', { quality: 80 }],
						['pngquant', { quality: [0.6, 0.8] }],
					],
				},
			},
		},
	],
};
