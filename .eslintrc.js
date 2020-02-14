module.exports = {
	env: {
		es6: true,
		node: true,
	},
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'prettier/@typescript-eslint',
	],
	ignorePatterns: ['node_modules', 'dist', 'coverage'],
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module',
	},
	rules: {
		'@typescript-eslint/array-type': 'error',
		'@typescript-eslint/consistent-type-assertions': 'off',
		'@typescript-eslint/explicit-member-accessibility': [
			'off',
			{
				accessibility: 'explicit',
			},
		],
		'@typescript-eslint/indent': 'off',
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/member-delimiter-style': [
			'off',
			{
				multiline: {
					delimiter: 'none',
					requireLast: true,
				},
				singleline: {
					delimiter: 'semi',
					requireLast: false,
				},
			},
		],
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-misused-new': 'off',
		'@typescript-eslint/no-parameter-properties': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/prefer-for-of': 'error',
		'@typescript-eslint/prefer-function-type': 'error',
		'@typescript-eslint/quotes': 'off',
		'@typescript-eslint/semi': ['off', null],
		'@typescript-eslint/type-annotation-spacing': 'off',
		'@typescript-eslint/unified-signatures': 'error',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/array-type': 'off',
		'@typescript-eslint/no-empty-interface': 'off',
		'@typescript-eslint/camelcase': 'off',
		complexity: 'off',
		'eol-last': 'off',
		'no-underscore-dangle': 'off',
		'no-useless-escape': 'off',
		'guard-for-in': 'error',
		'id-blacklist': [
			'error',
			'any',
			'Number',
			'number',
			'String',
			'string',
			'Boolean',
			'boolean',
			'Undefined',
			'undefined',
		],
		'id-match': 'error',
		'import/order': 'off',
		'max-classes-per-file': ['error', 1],
		'max-len': 'off',
		'new-parens': 'off',
		'newline-per-chained-call': 'off',
		'no-bitwise': 'error',
		'no-caller': 'error',
		'no-cond-assign': 'error',
		'no-console': 'off',
		'no-debugger': 'error',
		'no-empty': [
			'error',
			{
				allowEmptyCatch: true,
			},
		],
		'no-eval': 'error',
		'no-extra-semi': 'off',
		'no-fallthrough': 'off',
		'no-invalid-this': 'off',
		'no-irregular-whitespace': 'off',
		'no-multiple-empty-lines': 'off',
		'no-new-func': 'error',
		'no-new-wrappers': 'error',
		'no-return-await': 'error',
		'no-shadow': [
			'error',
			{
				hoist: 'all',
			},
		],
		'no-sparse-arrays': 'error',
		'no-throw-literal': 'error',
		'no-trailing-spaces': 'off',
		'no-undef-init': 'error',
		'no-unsafe-finally': 'error',
		'no-unused-expressions': 'error',
		'no-unused-labels': 'error',
		'object-shorthand': 'error',
		'one-var': ['error', 'never'],
		'prefer-const': 'off',
		'quote-props': 'off',
		radix: 'error',
		'space-before-function-paren': 'off',
		'space-in-parens': ['off', 'never'],
		'spaced-comment': 'error',
		'use-isnan': 'error',
		'valid-typeof': 'off',
	},
	settings: {},
};
