import browserExtension from 'vite-plugin-web-extension';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src',
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true
  },
  plugins: [
    svelte(),
    browserExtension({
      manifest: resolve(__dirname, 'src/manifest.json'),
      assets: 'assets',
      additionalInputs: ['newtab/index.html'],
      watchFilePaths: [resolve(__dirname, 'src/manifest.json')],
      verbose: true,
      browser: process.env.TARGET || 'chrome'
    })
  ]
});
