'use strict';

console.info('require page c.');

// import 'commonCss'
require('commonCss')
import '../scss/c.scss'

let $ = require('zepto')

// 直接使用npm模块
var _ = require('lodash');

var report = require('./helpers/report');
var bar = require('./helpers/bar');
var url = require('./utils/url');

console.log(_)
