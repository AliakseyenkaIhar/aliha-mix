const path = require('path');
require('dotenv').config();

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

// Mix
const mix = require('../../test/aliha.mix');

// Rules
const jsRule = require('../rules/babel');
const stylesRule = require('../rules/styles');
const fontsRule = require('../rules/fonts');

// Theme settings
const { THEME: themeName } = process.env;
const themeFolder = `web/app/themes/${themeName}`;

// Define is it production mode or not
const isProd = process.env.NODE_ENV === 'production';

// Filename output for js and css files
const fileName = (ext) => `${ext}/[name].[contenthash:8].${ext}`;

// Plugins
const plugins = [

	new RemoveEmptyScriptsPlugin(),

	new MiniCssExtractPlugin({
		filename: () => fileName('css'),
	}),
];

const config = {

	context: path.resolve(themeFolder),

	target: isProd ? 'browserslist' : 'web',

	devtool: isProd ? false : 'eval-cheap-source-map',

	entry: () => new Promise((resolve) => resolve(
		mix.getEntries(),
	)),

	output: {

		path: path.resolve(themeFolder, mix.outputPath),

		filename: () => fileName('js'),

		publicPath: '',

		clean: {
			dry: false,
			keep: (asset) => asset.includes('languages') || asset.includes('.gitignore'),
		},

		hotUpdateChunkFilename: '[id].hot-update.js',

		hotUpdateMainFilename: '[runtime].hot-update.json',
	},

	// stats: 'errors-only',

	optimization:
		isProd ?
			{
				runtimeChunk: 'single',
				splitChunks: {
					chunks: 'all',
					maxInitialRequests: Infinity,
					minSize: 0,
					cacheGroups: {
						vendor: {
							test: /[\\/]node_modules[\\/]/,
							name(module) {
								const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
								return `libs/${packageName.replace('@', '')}`;
							},
						},
					},
				},
			} :
			{},

	plugins,

	module: {
		rules: [
			jsRule,
			stylesRule,
			fontsRule,
		],
	},

};

module.exports = config;
