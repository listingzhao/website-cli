'use strict';

const fs = require('fs')
const path = require('path')
const render = require('koa-ejs')
const proxy = require('koa-proxy')
const send  = require('koa-send')
const viewRoot = path.resolve(__dirname, '../' + 'assets')

const list = require('../mock/list');

module.exports = (router, app, staticDir) => {
    // mock api
    router.get('/api/list', function*() {
        let query = this.query || {};
        let offset = query.offset || 0;
        let limit = query.limit || 10;
        let diff = limit - list.length;

        if(diff <= 0) {
            this.body = {code: 0, data: list.slice(0, limit)};
        } else {
            let arr = list.slice(0, list.length);
            let i = 0;

            while(diff--) arr.push(arr[i++]);

            this.body = {code: 0, data: arr};
        }
    });

    // proxy api

    router.post('/passport/existUserByEmail.html', proxy({url: 'http://192.168.30.72:8080/mfkj-web/passport/existUserByEmail.html'}));


    let env = process.argv[2] || process.env.NODE_ENV
    let dev = 'production' !== env
    // let rootPath = path.resolve(__dirname, '../' + (dev ? 'src' : 'assets'))
    let rootPath = path.resolve(__dirname, '../' + 'views')

    render(app, {
        root: rootPath,
        layout: false,
        viewExt: 'html',
        cache: false,
        debug: true
    });

    router.get('/', function*() {
        let pages = fs.readdirSync(staticDir);

        pages = pages.filter((page) => {
            return /\.html$/.test(page);
        });

        console.log('router get /')

        yield this.render('home0', {pages: pages || []});
    });

    let webTile = '歪闹日志';
    router.get('/home', function *(){
      // yield send(this, '/index.html', { root: viewRoot })
      yield this.render('index',{
    		title: '首页 - ' + webTile,
    		pageNav: 'index'
    	})
    });

    router.get('/products/packet', function *(){
      yield this.render('packet')
    })

    router.get('/products/wallet', function *(){
      yield this.render('wallet')
    })

    router.get('/products/insure', function *(){
      yield this.render('insure')
    })

    router.get('/products/market', function *(){
      yield this.render('market')
    })

    router.get('/docs/downloads', function *(){
      yield this.render('download')
    })

    router.get('/docs/api', function *(){
      yield this.render('dev-doc')
    })

    router.get('/about', function *(){
      yield this.render('about')
    })

    router.get('/news', function *(){
      yield this.render('news')
    })

    router.get('/login', function *(){
      yield this.render('login')
    })

    router.get('/email-reg', function *(){
      yield this.render('email-reg')
    })

    // router.get('/a', function *(){
    //   yield send(this, '/a.html', { root: viewRoot })
    // });


};
