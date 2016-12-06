const path = require('path')
const webpack = require('webpack')
// const fs = require('fs')
const glob = require('glob')
const config = require('../config')
const utils = require('./utils')
const projectRoot = path.resolve(__dirname, '../')

// var entryPath = './src/'

const srcDir = path.resolve(process.cwd(), 'src')
// const nodeModPath = path.resolve(__dirname, './node_modules')

// var entris = fs.readdirSync(entryPath).reduce(function (o, filename) {
//   !/\./.test(filename) &&
//   (o[filename] = './' + path.join(entryPath, filename, filename + '.js'))
//   return o
// }, {}
// )

let entries = (() => {
  let jsDir = path.resolve(srcDir, 'js')
  let entryFiles = glob.sync(jsDir + '/*.js')
  let map = {}

  entryFiles.forEach((filePath) => {
    let filename = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'))
    map[filename] = filePath
  })

  return map
})()

module.exports = {
  entry: Object.assign(entries, {
      // 公共lib将公用库单独提取打包
      'base': ['base'],
      'vender': [
          'jquery', 'slide'
      ]
  }),
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.css', '.scss', '.tpl', '.png', '.jpg'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel?presets[]=es2015',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(ejs|tpl)$/,
        loader: 'ejs'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash',
      jQuery: 'jquery',
      $: 'jquery'
    })
  ],
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
}
