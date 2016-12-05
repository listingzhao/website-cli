'use strict';

// load native modules
const http = require('http')
const path = require('path')
const util = require('util')
const fs = require('fs')

// load 3rd modules
const koa = require('koa')
const proxy = require('koa-proxy')
const send  = require('koa-send')
const router = require('koa-router')()
const serve = require('koa-static')
const colors = require('colors')
const open = require('open')

// load local modules
const pkg = require('./package.json')
const env = process.argv[2] || process.env.NODE_ENV
const dev = 'production' !== env
const viewDir = dev ? 'src' : 'assets'
const staticDir = path.resolve(__dirname, '../' + (dev ? 'src' : 'assets'))

// load routes
const routes = require('./routers/routes')

// init framework
let app = koa()

const exec = require('child_process').exec;

colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
})

// basic settings
app.keys = [pkg.name, pkg.description]
app.proxy = true

// app.use(proxy({
//   host: 'http://192.168.30.72:8080/mfkj-web',
//   match: /^(.*?\.html)/
// }));

// global events listen
app.on('error', (err, ctx) => {
    err.url = err.url || ctx.request.url
    console.error(err.stack, ctx)
})

// handle favicon.ico
app.use(function*(next) {
    if (this.url.match(/favicon\.ico$/)) this.body = ''
    yield next
})

// logger
app.use(function*(next) {
    console.log(this.method.info, this.url)
    yield next
})

// use routes
routes(router, app, staticDir)
app.use(router.routes())

if(dev) {
    let webpackDevMiddleware = require('koa-webpack-dev-middleware')
    let webpack = require('webpack')
    let webpackConf = require('../webpack-dev.config')
    let compiler = webpack(webpackConf)

    // 为使用Koa做服务器配置koa-webpack-dev-middleware
    app.use(webpackDevMiddleware(compiler, webpackConf.devServer))

    // 为实现HMR配置webpack-hot-middleware
    let hotMiddleware = require("webpack-hot-middleware")(compiler);
    // Koa对webpack-hot-middleware做适配
    app.use(function* (next) {
      yield hotMiddleware.bind(null, this.req, this.res);
      yield next;
    })
}

// handle static files
app.use(serve(staticDir, {
    maxage: 0
}))

module.exports = app;
