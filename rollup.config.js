import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import pkg from './package.json';

const opts = {
  input: 'src/index.ts',
  plugins: [
    resolve({ preferBuiltins: true }),
    typescript({
      typescript: require('typescript'),
      module: 'esnext',
      allowJs: true,
    }),
  ],
};

export default [
  {
    ...opts,
    input: 'src/index.ts',
    output: [
      { file: pkg.module, format: 'es', sourcemap: false },
      { file: pkg.main, format: 'cjs', sourcemap: false },
      {
        name: 'futilities',
        file: pkg.browser,
        format: 'umd',
      },
    ],
  },
];
