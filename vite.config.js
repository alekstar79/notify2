/**
* @see [texsaur](https://github.com/ConnorJamesLow/texsaur)
* @see [terser](https://longviewcoder.com/2023/04/19/vite-build-how-to-erase-comments)
*/

import Inspect from 'vite-plugin-inspect'
import checker from 'vite-plugin-checker'
import dts from 'vite-plugin-dts'

import { terser } from 'rollup-plugin-terser'
import { defineConfig } from 'vite'
import { resolve } from 'path'

/** @type {import('vite').UserConfig} */
export default defineConfig({
  root: resolve(__dirname, 'src'),
  esbuild: {
    jsxFactory: 'jsx',
    jsxFragment: 'jsx.Fragment',
    jsxInject: 'import jsx from "texsaur"'
  },
  plugins: [
    Inspect(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/*.{ts,tsx}"',
        useFlatConfig: true
      }
    }),
    dts({
      root: resolve(__dirname, '.'),
      outDir: resolve(__dirname, 'dist'),
      entryRoot: resolve(__dirname, 'src'),
      strictOutput: true,
      tsconfigPath: resolve(__dirname, 'tsconfig.json'),
      declarationOnly: false,
      insertTypesEntry: true,
      copyDtsFiles: true,
    })
  ],
  build: {
    outDir: resolve(__dirname, 'dist'),
    copyPublicDir: false,
    emptyOutDir: true,
    minify: 'esbuild', // 'terser' | 'esbuild'

    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'umd'],
      name: 'Notify2',

      fileName: (format, name) => {
        return format === 'es' ? `${name}.js` : `${name}.${format}.cjs`
      }
    },
    rollupOptions: {
      external: ['texsaur'],

      plugins: [
        terser({
          format: {
            comments: false,
          },
          mangle: {
            keep_classnames: false,
            reserved: []
          }
        })
      ]
    }
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.tsx'],
    alias: {
      //
    }
  }
})
