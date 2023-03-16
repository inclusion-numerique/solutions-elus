// TODO Enable these rules that are only temporarily disabled for merging lint config
// TODO If there is rules that should not be enabled because we dont agree on style guide, put them in lint package eslint.config.js
const temporarilyDisabledRules = [
  '@typescript-eslint/no-explicit-any',
  '@typescript-eslint/no-floating-promises',
  '@typescript-eslint/no-misused-promises',
  '@typescript-eslint/no-shadow',
  '@typescript-eslint/no-unsafe-argument',
  '@typescript-eslint/no-unsafe-assignment',
  '@typescript-eslint/no-unsafe-call',
  '@typescript-eslint/no-unsafe-member-access',
  '@typescript-eslint/no-unused-expressions',
  '@typescript-eslint/no-unused-vars',
  '@typescript-eslint/no-use-before-define',
  '@typescript-eslint/require-await',
  '@typescript-eslint/restrict-template-expressions',
  'consistent-return',
  'eqeqeq',
  'import/no-cycle',
  'import/no-extraneous-dependencies',
  'import/order',
  'jest/expect-expect',
  'jest/no-commented-out-tests',
  'jest/no-disabled-tests',
  'jest/no-export',
  'jsx-a11y/anchor-is-valid',
  'jsx-a11y/iframe-has-title',
  'jsx-a11y/label-has-associated-control',
  'jsx-a11y/no-autofocus',
  'jsx-a11y/no-redundant-roles',
  'no-continue',
  'no-new',
  'no-param-reassign',
  'no-restricted-exports',
  'no-restricted-syntax',
  'no-underscore-dangle',
  'no-use-before-define',
  'radix',
  'react/button-has-type',
  'react/destructuring-assignment',
  'react/function-component-definition',
  'react/jsx-no-useless-fragment',
  'react/no-unused-prop-types',
  'unicorn/consistent-destructuring',
  'unicorn/filename-case',
  'unicorn/no-array-callback-reference',
  'unicorn/no-array-reduce',
  'unicorn/prefer-logical-operator-over-ternary',
  'unicorn/prefer-query-selector',
  'unicorn/prefer-spread',
  'unicorn/prevent-abbreviations',
  'vars-on-top',
].map((rule) => [rule, 'off'])


// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  rules: {
    ...Object.fromEntries(temporarilyDisabledRules),
    // Process exit ok in cli apps
    'unicorn/no-process-exit': 'off',
    // __dirname is ok for now
    'unicorn/prefer-module': 'off'
  },
}
