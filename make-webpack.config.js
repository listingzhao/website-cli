'use strict';

const path = require('path')
// const AssetsPlugin = require('assets-webpack-plugin')
// const assetsPluginInstance = new AssetsPlugin({filename: 'assets.json'})  assets 文件输出路径json文件
const fs = require('fs')

const webpack = require('webpack')
const _ = require('lodash')
const glob = require('glob')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HelloAsyncPlugin = require('./plugin/HelloAsyncPlugin')
const CompHtmlPlugin = require('./plugin/CompHtmlPlugin')

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin
const DefinePlugin = webpack.DefinePlugin

const srcDir = path.resolve(process.cwd(), 'src')
const assets = path.resolve(process.cwd(), 'assets')
const nodeModPath = path.resolve(__dirname, './node_modules')
const pathMap = require('./src/pathmap.json')
const outputDir = 'public'
let entries = (() => {
    let jsDir = path.resolve(srcDir, 'js')
    let entryFiles = glob.sync(jsDir + '/*.js')
    let map = {}

    entryFiles.forEach((filePath) => {
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        map[filename] = filePath
    })

    return map
})()
let chunks = Object.keys(entries)



module.exports = (options) => {
    options = options || {}

    let dev = options.dev !== undefined
        ? options.dev
        : true
    // 这里publicPath要使用绝对路径，不然scss/css最终生成的css图片引用路径是错误的，应该是scss-loader的bug
    let publicPath = '/'
    let extractCSS
    let cssLoader
    let sassLoader
    let lessLoader

    // generate entry html files
    // 自动生成入口文件，入口js名必须和入口文件名相同
    // 例如，a页的入口文件是a.html，那么在js目录下必须有一个a.js作为入口文件
    let plugins = (() => {
        let pages = Object.keys(getEntry('src/views/**/*.html', 'src/views/'));
        // let entryHtml = glob.sync(srcDir + '/*.html')
        let r = []

        pages.forEach((pathname) => {
          var conf = {
        		filename: '../views/' + pathname + '.html', //生成的html存放路径，相对于path
        		template: 'html!src/views/' + pathname + '.html', //html模板路径
        		inject: false, //js插入的位置，true/'head'/'body'/false
        		/*
        		 * 压缩这块，调用了html-minify，会导致压缩时候的很多html语法检查问题，
        		 * 如在html标签属性上使用{{...}}表达式，很多情况下并不需要在此配置压缩项，
        		 * 另外，UglifyJsPlugin会在压缩代码的时候连同html一起压缩。
        		 * 为避免压缩html，需要在html-loader上配置'html?-minimize'，见loaders中html-loader的配置。
        		 */
        		// minify: { //压缩HTML文件
        		// 	removeComments: true, //移除HTML中的注释
        		// 	collapseWhitespace: false //删除空白符与换行符
        		// }
        	};
          if (pathname in entries) {
              conf.favicon = path.resolve(__dirname, 'src/img/2.0/favicon.ico');
              conf.inject = 'body'
              conf.chunks = ['base', 'vender', 'common', pathname]
              conf.hash = true;
          }

          if ('b' === pathname || 'c' === pathname) {
              conf.chunks.splice(2, 0, 'common-b-c')
          }
          r.push(new HtmlWebpackPlugin(conf))
          r.push(new CompHtmlPlugin({options: true}))
        })

        return r
    })()

    // 加载到runtime
    plugins.push(
        new webpack.ProvidePlugin({
            _: 'lodash', // 按需引用
            jQuery: "jquery",
            $: 'jquery'
        })
    )
    // assetsPluginInstance
    // plugins.push(assetsPluginInstance)

    if (dev) {
        extractCSS = new ExtractTextPlugin('assets/css/[name].css?[contenthash]')
        cssLoader = extractCSS.extract('style', 'css!postcss')
        sassLoader = extractCSS.extract('style', 'css!postcss!sass')
        lessLoader = extractCSS.extract('style', 'css!postcss!less')
        plugins.push(extractCSS, new webpack.HotModuleReplacementPlugin())
    } else {
        extractCSS = new ExtractTextPlugin(outputDir + '/css/[name]-[chunkhash:8].css', {
            // 当allChunks指定为false时，css loader必须指定怎么处理
            // additional chunk所依赖的css，即指定`ExtractTextPlugin.extract()`
            // 第一个参数`notExtractLoader`，一般是使用style-loader
            // @see https://github.com/webpack/extract-text-webpack-plugin
            allChunks: false
        })
        cssLoader = extractCSS.extract('style', 'css?minimize!postcss')
        sassLoader = extractCSS.extract('style', 'css?minimize!postcss!sass')
        lessLoader = extractCSS.extract('style', 'css?minimize!postcss!less')
        plugins.push(extractCSS, new UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            mangle: {
                except: ['$', 'exports', 'require']
            }
        }),
        // use `production` mode
        new DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        // new AssetsPlugin({
        //     filename: path.resolve(public, 'source-map.json')
        // }),
        new webpack.optimize.DedupePlugin(), new webpack.NoErrorsPlugin())
    }

    let config = {
        entry: Object.assign(entries, {
            // 公共lib（如React.js）,将公用库单独提取打包
            'base': ['base'],
            'vender': [
                'jquery', 'slide'
            ]
        }),
        output: {
            path: assets,
            filename: dev
                ? '[name].js'
                // : 'js/[name].[chunkhash:8].js',
                : outputDir + '/js/[name]-[chunkhash:8].js',
            chunkFilename: dev
                ? '[chunkhash:8].chunk.js'
                : outputDir + '/js/chunk-[chunkhash:8].js',
            hotUpdateChunkFilename: dev
                ? '[id].js'
                : outputDir + '/js/[id]-[chunkhash:8].js',
            publicPath: publicPath
        },

        resolve: {
            root: [
                srcDir, nodeModPath
            ],
            alias: pathMap,
            extensions: [
                '',
                '.js',
                '.css',
                '.scss',
                '.tpl',
                '.png',
                '.jpg'
            ]
        },

        module: {
            loaders: [
                {
                    test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
                    loaders: [
                        // url-loader更好用，小于10KB的图片会自动转成dataUrl，
                        // 否则则调用file-loader，参数直接传入
                        'url?limit=10000&name='+outputDir+'/images/[hash:8].[name].[ext]',
                        'image?{bypassOnDebug:true, progressive:true,optimizationLevel:3,pngquant:{quality:"65-80",speed:4}}'
                    ]
                }, {
                    test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
                    loader: 'url?limit=10000&name='+outputDir+'/fonts/[hash:8].[name].[ext]'
                },
                {
                    test: /\.(ejs|tpl)$/,
                    loader: 'ejs'
                },
                {
                  test: /\.json$/,
                  loader: "json"
                },
                , {
                    test: /\.scss$/,
                    loader: sassLoader
                }
                , {
                    test: /\.less$/,
                    loader: lessLoader
                },
                  {
                    test: /\.css$/,
                    loader: cssLoader
                },{
                    test: /\.jsx?$/,
                    loader: 'babel?presets[]=react,presets[]=es2015'
                }
            ]
        },
        postcss: [ autoprefixer({ browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8'] }) ],
        plugins: [
            // new webpack.DllReferencePlugin({
            //     context: process.cwd(),
            //     manifest: require(path.join(assets, 'dll', 'js', 'reactStuff-manifest.json')),
            //     sourceType: 'var',
            //     name: 'assets/dll/js/reactStuff.js'
            // }),
            // new CommonsChunkPlugin({
            //     name: 'common-b-c',
            //     chunks: ['b', 'c']
            // }),
            // new CommonsChunkPlugin({
            //     name: 'common',
            //     chunks: ['common-b-c', 'a']
            // }),
            // new CommonsChunkPlugin({
            //     name: 'common',
            //     chunks: ['base','index']
            // })
            // ,
            new CommonsChunkPlugin("base", dev
                ? '[name].js'
                : outputDir + '/js/[name]-[chunkhash:8].js')
        ].concat(plugins),

        devServer: {
            // hot: true,
            noInfo: false,
            inline: true,
            publicPath: publicPath,
            stats: {
                cached: false,
                colors: true
            }
        }
    }

    if (dev) {
        // 为实现webpack-hot-middleware做相关配置
        // @see https://github.com/glenjamin/webpack-hot-middleware
        ((entry) => {
            for (let key of Object.keys(entry)) {
                if (!Array.isArray(entry[key])) {
                    entry[key] = Array.of(entry[key])
                }
                entry[key].push('webpack-hot-middleware/client?reload=true')
            }
        })(config.entry)
        config.plugins.push(new webpack.optimize.OccurenceOrderPlugin()),
        config.plugins.push(new webpack.HotModuleReplacementPlugin())
        config.plugins.push(new webpack.NoErrorsPlugin())

    }

    return config
}


/**
 * [getEntry getEntry]
 * @param  {[type]} globPath [description]
 * @param  {[type]} pathDir  [description]
 * @return {[type]}          [description]
 */
function getEntry(globPath, pathDir) {
	var files = glob.sync(globPath);
	var entries = {},
		entry, dirname, basename, pathname, extname;

	for (var i = 0; i < files.length; i++) {
		entry = files[i];
		dirname = path.dirname(entry);
		extname = path.extname(entry);
		basename = path.basename(entry, extname);
		pathname = path.normalize(path.join(dirname,  basename));
		pathDir = path.normalize(pathDir);
		if(pathname.startsWith(pathDir)){
			pathname = pathname.substring(pathDir.length)
		}
		entries[pathname] = ['./' + entry];
	}
	return entries;
}
