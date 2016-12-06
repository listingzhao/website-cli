'use strict';

let genConf = require('./make-webpack.config')
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

// 定义函数判断是否是在当前生产环境，这个很重要，一位开发环境和生产环境配置上有一些区别
var isProduction = function () {
  return process.env.NODE_ENV === 'production';
};

const outputDir = './dist';

var entryPath = './src/js';

const srcDir = path.resolve(process.cwd(), 'src')
const nodeModPath = path.resolve(__dirname, './node_modules')
const aliasMap = require('./src/aliasmap.json')

var entris = fs.readdirSync(entryPath).reduce(function (o, filename) {
    !/\./.test(filename) &&
    (o[filename] = './' + path.join(entryPath, filename, filename + '.js'));
    return o;
  }, {}
);

console.log(entris);

var plugins = [
  // new webpack.optimize.CommonsChunkPlugin({
  //   name: 'commons',
  //   filename: 'js/commons.js',
  // })
];

if( isProduction() ) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
    })
  );
}

module.exports = {
  // 入口配置
  entry: entris,
  // 输出配置
  output: {
    path: outputDir,
    filename: isProduction() ? 'js/[name]-[chunkhash:8].js' : 'js/[name].bundle.js',
    publicPath: isProduction() ? 'http://a.jrmf360.com' : 'http://localhost:3000/dist',
  },
  // 其它解决方案配置
  resolve: {
    root: [
        srcDir, nodeModPath
    ],
    extensions: ['', '.js', '.css','.scss','.tpl','.png','.jpg'],
    alias: aliasMap,
  },
  module: {
    // avoid webpack trying to shim process
    noParse: /es6-promise\.js$/
  }
}


module.exports = genConf({dev: false})
