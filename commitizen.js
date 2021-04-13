module.exports = {
	types: [
		{
			value: 'build',
			name: 'build: Build system or external dependencies changes',
		},
		{
			value: 'ci',
			name: 'ci: CI configurations and script changes',
		},
		{
			value: 'docs',
			name: 'docs: Documentation',
		},
		{
			value: 'feat',
			name: 'feat: A new feature',
		},
		{
			value: 'fix',
			name: 'fix: A bug fix',
		},
		{
			value: 'perf',
			name: 'perf: Improve performance',
		},
		{
			value: 'refactor',
			name: 'refactor: A code refactoring',
		},
		{
			value: 'revert',
			name: 'revert: Reverts a previous commit',
		},
		{
			value: 'style',
			name: 'style: Formatting',
		},
		{
			value: 'test',
			name: 'test: Add missing test',
		},
	],
	allowCustomScopes: true,
	allowBreakingChanges: false,
	footerPrefix: 'METADATA:',
	subjectLimit: 72,
};
