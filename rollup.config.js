/* eslint-disable import/no-extraneous-dependencies */
import autoprefixer from 'autoprefixer';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
//import { terser } from 'rollup-plugin-terser';

export default {
  preserveModules: true,
  input: 'src/index.ts',
  output: [
    /*{
      dir: './lib',
      format: 'cjs',
      sourcemap: true,
    },*/
    {
      dir: './es',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ declaration: true, outDir: './es' }),
    postcss({
      plugins: [autoprefixer()],
      sourceMap: true,
      extract: true,
      minimize: true,
    }),
    //terser(), // minifies generated bundles
  ],
};
