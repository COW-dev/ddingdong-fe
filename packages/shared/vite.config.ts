import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';

import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), svgr({ include: '**/*.svg' }), dts({ insertTypesEntry: true })],
  resolve: {
    alias: {
      '@/shared': resolve(__dirname),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: 'DdingdongDesignSystem',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'framer-motion', /^@radix-ui\/.*/],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    cssCodeSplit: false,
  },
});
