import { resolve } from 'path';

import type { StorybookConfig } from '@storybook/react-vite';
import svgr from 'vite-plugin-svgr';

const config: StorybookConfig = {
  stories: ['../ui/**/*.mdx', '../ui/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (config) => {
    config.plugins = config.plugins ?? [];
    config.plugins.push(
      svgr({
        include: '**/*.svg',
      })
    );
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/shared': resolve(__dirname, '..'),
    };
    return config;
  },
};

export default config;
