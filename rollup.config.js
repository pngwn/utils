import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import typescript from 'rollup-plugin-typescript';
import pkg from './package.json';

const opts = {
  input: 'src/index.ts',
  external: id =>
    ![
      'cache',
      'compile',
      'generateOptions',
      'main.ts',
      'transform',
      'htmlTransform',
    ].some(v => id.indexOf(v) > -1),
  plugins: [
    resolve({ preferBuiltins: true }),
    commonjs(),
    json(),
    typescript({
      typescript: require('typescript'),
      module: 'esnext',
      allowJs: true,
    }),
  ],
};

export default [
  // helper utils -- main
  {
    ...opts,
    input: 'src/main.ts',
    output: [
      { file: pkg.module, format: 'es', sourcemap: false },
      { file: pkg.main, format: 'cjs', sourcemap: false },
    ],
  },
  // jest transform -- transformHtml
  //   {
  //     ...opts,
  //     input: 'src/jest/htmlTransform.ts',

  //     output: {
  //       file: 'dist/transform/index.js',
  //       format: 'cjs',
  //       sourcemap: false,
  //     },
  //   },

  /* cli/*.js */
];
