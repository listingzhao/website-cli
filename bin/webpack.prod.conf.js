var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

const srcDir = path.resolve(process.cwd(), 'src')
const nodeModPath = path.resolve(__dirname, './node_modules')
const aliasMap = require('../src/aliasmap.json')

var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

  // generate entry html files
  // 自动生成入口文件，入口js名必须和入口文件名相同
  // 例如，a页的入口文件是a.html，那么在js目录下必须有一个a.js作为入口文件
  let plugins = (() => {
    let pages = Object.keys(utils.getEntry('src/views/**/*.html', 'src/views/'))
    let r = []

    pages.forEach((pathname) => {
      var conf = {
        filename: '../views/' + pathname + '.html', // 生成的html存放路径，相对于path
        template: 'html!src/views/' + pathname + '.html', // html模板路径
        inject: false,
        minify: {
          // removeComments: true,
          // collapseWhitespace: true,
          // removeAttributeQuotes: true
          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        },
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        // chunksSortMode: 'dependency'
      }
      if (pathname in baseWebpackConfig.entry) {
        conf.favicon = path.resolve(__dirname, '../src/img/2.0/favicon.ico')
        conf.inject = 'body'
        conf.chunks = ['base', 'vender', pathname]
      }

      r.push(new HtmlWebpackPlugin(conf))
      r.push(new webpack.optimize.CommonsChunkPlugin("base", utils.assetsPath('js/base-[chunkhash:6].js')))
    })

    return r
  })()
console.log(Object.keys(baseWebpackConfig.entry));
var webpackConfig = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
  },
  resolve: {
    root: [
      srcDir, nodeModPath
    ],
    alias: aliasMap
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name]-[chunkhash:6].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: {
          except: ['$', 'exports', 'require']
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin(utils.assetsPath('css/[name]-[contenthash:6].css')),

    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vender',
    //   filename: utils.assetsPath('js/vender-[chunkhash:6].js')
    // })
  ].concat(plugins)
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = webpackConfig
