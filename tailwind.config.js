require('dotenv').config();

const { THEME: themeName } = process.env;
const themeFolder = `web/app/themes/${themeName}`;

module.exports = {

	mode: 'jit',

	purge: [
		`${themeFolder}/resources/views/**/*.twig`,
		`${themeFolder}/resources/assets/js/**/*.js`,
	],

	theme: {
		extend: {},
	},
};
