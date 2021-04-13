const path = require('path');
require('dotenv').config();

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WebpackBar = require('webpackbar');
const WebpackNotifierPlugin = require('webpack-notifier');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const ShowAssetsTablePlugin = require('webpack-show-assets-table');

// Mix
const mix = require('../../aliha.mix');

// Rules
const jsRule = require('../rules/babel');
const stylesRule = require('../rules/styles');
const fontsRule = require('../rules/fonts');
const imagesRule = require('../rules/images');
const svgRule = require('../rules/svg');
const iconsRule = require('../rules/icons');
const modernizrRule = require('../rules/modernizr');

// Theme settings
const { THEME: themeName, WP_HOME, BROWSER } = process.env;
const themeFolder = `web/app/themes/${themeName}`;

// Define is it production mode or not
const isProd = process.env.NODE_ENV === 'production';

// Filename output for js and css files
const fileName = (ext) => `${ext}/[name].[contenthash:8].${ext}`;

// Plugins
const plugins = [

	new BrowserSyncPlugin(
		{
			proxy: WP_HOME,
			files: [
				path.resolve(themeFolder, './resources/views/**/*.twig'),
				path.resolve(themeFolder, './**/*.php'),
				path.resolve(themeFolder, './style.css'),
				path.resolve('./config/**/*.php'),
				path.resolve('./framework/**/*.php'),
				path.resolve('./framework/**/*.js'),
			],
			browser: BROWSER,
			notify: false,
			open: true,
		}
	),

	new RemoveEmptyScriptsPlugin(),

	new MiniCssExtractPlugin({
		filename: () => fileName('css'),
	}),

	new WebpackNotifierPlugin({
		title: process.env.NAME,
		excludeWarnings: true,
	}),

	new WebpackManifestPlugin(),

	new WebpackBar({
		name: process.env.NAME,
	}),

	new CaseSensitivePathsPlugin(),
];

if(!process.env.LIVE) {
	plugins.push(
		new ShowAssetsTablePlugin(),
	)
}

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

	resolve: {
		alias: {
			'@js': path.resolve(themeFolder, 'resources/assets/js'),
			'@img': path.resolve(themeFolder, 'resources/assets/img'),
			'@sass': path.resolve(themeFolder, 'resources/assets/sass'),
			'@icons': path.resolve(themeFolder, 'resources/assets/icons'),
			'@fonts': path.resolve(themeFolder, 'resources/assets/fonts'),
			'@resources': path.resolve(themeFolder, 'resources'),
			'modernizr$': path.resolve('.modernizrrc'),
		},
		symlinks: false,
	},

	stats: 'errors-only',

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
			modernizrRule,
			jsRule,
			stylesRule,
			fontsRule,
			imagesRule,
			svgRule,
			iconsRule,
		],
	},

};

module.exports = config;
