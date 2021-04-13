module.exports = {
	test: /\.m?js$/,
	exclude: [
		/@babel(?:\/|\\{1,2})runtime|core-js/,
		/(node_modules|bower_components)/,
	],
	loader: 'babel-loader',
};
