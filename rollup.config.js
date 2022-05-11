import common from '@rollup/plugin-commonjs'
import node from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

const path = require('path')

const getPath = _path => path.resolve(__dirname, _path)
const input = path.join(__dirname, './src/index.ts')
const output = path.join(__dirname, './build/index')

const isDev = process.env.NODE_ENV === 'development'

export default {
  input,
  plugins: [
    common(),
    node(),
    typescript({
      tsconfig: getPath('./tsconfig.json')
    })
  ],
  external: [/node_modules/],
  output: [
    {
      name: 'module',
      file: output + (isDev ? '.js' : '.min.js'),
      format: 'umd',
      sourcemap: true,
      globals: {
        tslib: 'tslib'
      }
    },
    {
      name: 'module',
      file: output + '.cjs.js',
      format: 'cjs',
      exports: 'auto',
      sourcemap: false,
      globals: {
        tslib: 'tslib'
      }
    }
  ]
}
