const path = require('path');

const { THEME: themeName } = process.env;
const themeFolder = `web/app/themes/${themeName}`;

module.exports = {
	'files': [
		path.resolve(`${themeFolder}/resources/assets/icons/**/*.svg`),
	],
	'fontName': 'aliha',
	'classPrefix': 'aliha-',
	'baseSelector': '.aliha-icon',
	'types': ['eot', 'woff', 'woff2', 'ttf', 'svg'],
	'fileName': 'fonts/iconic/[fontname].[hash:8].[ext]'
};
