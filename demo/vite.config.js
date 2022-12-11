import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import nodePolyfills from 'vite-plugin-node-stdlib-browser'

const assetsDir = '';
//const assetsDir = 'assets/';

const outputDefaults = {
  // remove hashes from filenames
  entryFileNames: `${assetsDir}[name].js`,
  chunkFileNames: `${assetsDir}[name].js`,
  assetFileNames: `${assetsDir}[name].[ext]`,
}

export default defineConfig({
  clearScreen: false,
  plugins: [
    solidPlugin(),
    nodePolyfills(),
  ],
  base: "./", // generate relative paths in html
  //root: 'src',
  build: {
    outDir: '../docs', // github pages
    emptyOutDir: true,
    target: 'esnext',
    //polyfillDynamicImport: false,
    //sourcemap: true,
    //minify: false, // smaller git diffs
    // example sizes for solidjs app with monaco-editor
    // false: 5396.78 KiB // smaller git diffs
    // 'esbuild': 2027.36 KiB // default
    // 'terser': 2002.37 KiB
    rollupOptions: {
      output: {
        ...outputDefaults,
      }
    },
  },
  esbuild: {
    // keep names of functions an classes
    // dont rename class BufferNode to class BufferNode$1
    // https://github.com/evanw/esbuild/issues/510#event-3983228566
    // https://github.com/vitejs/vite/issues/7916
    // see src/nix-eval.js
    // no effect
    keepNames: true,
  },
  worker: {
    rollupOptions: {
      output: {
        ...outputDefaults,
      }
    },
  },
  resolve: {
    alias: {
      // fix: ReferenceError: global is not defined @ node-fetch: Body.Promise = global.Promise;
      // fix: TypeError: Cannot read properties of undefined (reading 'prototype') @ node-fetch: Stream.Readable.prototype
      // https://github.com/octokit/octokit.js/issues/2126
      //'node-fetch': 'isomorphic-fetch',
    },
  },
});
