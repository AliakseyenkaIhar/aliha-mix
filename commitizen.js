module.exports = {
	types: [
		{
			value: 'feat',
			name: 'feat: A new feature',
		},
		{
			value: 'fix',
			name: 'fix: A bug fix',
		},
		{
			value: 'refactor',
			name: 'refactor: A code refactoring',
		},
	],
	allowCustomScopes: true,
	allowBreakingChanges: false,
	footerPrefix: 'METADATA:',
	subjectLimit: 72,
};
