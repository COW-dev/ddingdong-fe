import baseConfig from '@ddingdong/tailwind-config';
import type { Config } from 'tailwindcss';

const config: Config = {
  ...baseConfig,
  content: [
    './**/*.{ts,tsx}',
    '../../packages/shared/**/*.{ts,tsx}',
    '../../node_modules/react-tailwindcss-datepicker/dist/**/*.{js,mjs}',
  ],
};

export default config;
