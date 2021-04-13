const path = require('path');
require('dotenv').config();

// Mix
const mix = require('../../test/aliha.mix');

// Rules
const jsRule = require('../rules/babel');

// Theme settings
const { THEME: themeName } = process.env;
const themeFolder = `web/app/themes/${themeName}`;

// Filename output for js and css files
const fileName = (ext) => `${ext}/[name].[contenthash:8].${ext}`;

const config = {

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

	module: {
		rules: [
			jsRule,
		],
	},

};

module.exports = config;
