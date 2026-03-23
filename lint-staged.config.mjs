export default {
  'apps/web/**/*.{ts,tsx}': ['eslint --fix --config apps/web/.eslintrc.json', 'prettier --write'],
  'packages/**/*.{ts,tsx}': ['prettier --write'],
  '*.{json,md,yml,yaml}': ['prettier --write'],
};
