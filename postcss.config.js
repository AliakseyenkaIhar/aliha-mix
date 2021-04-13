const tailwindcss         = require('tailwindcss');
const postcssFocusVisible = require('postcss-focus-visible');

module.exports = {
	plugins: [
		tailwindcss(),
		postcssFocusVisible(),
	],
};
