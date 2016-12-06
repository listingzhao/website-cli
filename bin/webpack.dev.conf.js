'use strict'

const config = require('../config')
const webpack = require('webpack')
const glob = require('glob')
const merge = require('webpack-merge')
const utils = require('./utils')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompHtmlPlugin = require('../plugin/CompHtmlPlugin')
const path = require('path')

const srcDir = path.resolve(process.cwd(), 'src')
const nodeModPath = path.resolve(__dirname, './node_modules')
const aliasMap = require('../src/aliasmap.json')

// add hot-reload related code to entry chunks
var polyfill = 'eventsource-polyfill'
var hotClient = 'webpack-hot-middleware/client?noInfo=true&reload=true'

Object.keys(baseWebpackConfig.entry).forEach(function (name, i) {
  var extras = i === 0 ? [polyfill, hotClient] : [hotClient]
  baseWebpackConfig.entry[name] = extras.concat(baseWebpackConfig.entry[name])
})

// generate entry html files
// 自动生成入口文件，入口js名必须和入口文件名相同
// 例如，a页的入口文件是a.html，那么在js目录下必须有一个a.js作为入口文件
let plugins = (() => {
  let pages = Object.keys(utils.getEntry('src/views/**/*.html', 'src/views/'))
  let r = []

  pages.forEach((pathname) => {
    // https://github.com/ampedandwired/html-webpack-plugin
    var conf = {
      filename: '../views/' + pathname + '.html', // 生成的html存放路径，相对于path
      template: 'html!src/views/' + pathname + '.html', // html模板路径
      inject: false
    }
    if (pathname in baseWebpackConfig.entry) {
      conf.favicon = path.resolve(__dirname, '../src/img/2.0/favicon.ico')
      conf.inject = 'body'
      conf.chunks = ['base', 'vender', pathname]
    }

    r.push(new HtmlWebpackPlugin(conf))
    // compiler html
    r.push(new CompHtmlPlugin({options: true}))
    r.push(new webpack.optimize.CommonsChunkPlugin("base", '[name].js'))
  })

  return r
})()

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders()
  },
  resolve: {
    root: [
      srcDir, nodeModPath
    ],
    alias: aliasMap
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ].concat(plugins),
  devServer: {
    // hot: true,
    noInfo: false,
    inline: true,
    publicPath: '/',
    stats: {
      cached: false,
      colors: true
    }
  }
})
