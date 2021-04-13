const path = require('path');

const { THEME: themeName } = process.env;
const themeFolder = `web/app/themes/${themeName}`;

module.exports = {
	test: /\.(ttf|eot|woff(2?)|svg)$/,
	include: path.resolve(themeFolder, 'resources/assets/fonts'),
	type: 'asset/resource',
	generator: {
		filename: 'fonts/[name]/[name].[hash:8].[ext]'
	},
};
