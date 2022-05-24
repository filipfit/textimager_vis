import path from 'path';

// vite.config.js
export default {
  // config options
  root: './src',
  base: '/',
  // publicDir: './src/assets',
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
    },
  },
};
