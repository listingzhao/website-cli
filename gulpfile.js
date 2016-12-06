'use strict'

let gulp = require('gulp')
let webpack = require('webpack')

let gutil = require('gulp-util')

let webpackConf = require('./webpack.config')
let webpackDevConf = require('./webpack-dev.config')
const assetsDir = 'dev-assets'
// js check
gulp.task('hint', () => {
  let jshint = require('gulp-jshint')
  let stylish = require('jshint-stylish')

  return gulp.src([
    '!src/js/lib/**/*.js',
    'src/js/**/*.js'
  ]).pipe(jshint()).pipe(jshint.reporter(stylish))
})

// clean assets
gulp.task('clean', ['hint'], () => {
  let clean = require('gulp-clean')

  return gulp.src('assets', {read: true}).pipe(clean())
})

// run webpack pack
gulp.task('pack', ['clean'], (done) => {
  webpack(webpackConf, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err)
    gutil.log('[webpack]', stats.toString({colors: true}))
    done()
  })
})

gulp.task('dev-pack', ['clean'], (done) => {
  webpack(webpackDevConf, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err)
    gutil.log('[webpack]', stats.toString({colors: true}))
    done()
  })
})

// html process
gulp.task('default', ['pack'])

// deploy assets to remote server
gulp.task('deploy', () => {
  let sftp = require('gulp-sftp')

  return gulp.src(['assets/' + assetsDir + '/**', '!assets/' + assetsDir + '/*.html']) // exclude all *.html
    .pipe(sftp({
      host: '192.168.193.11',
      remotePath: '/data/server/jrmf/static/dev-assets',
      user: 'zhaoxinze',
      pass: 'zhaoxinze@123'
    }))
})
