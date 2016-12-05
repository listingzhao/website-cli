'use strict';

console.info('require base module.');

// console.log('┴┬┴┬／￣＼＿／￣＼ \n┬┴┬┴▏　　▏▔▔▔▔＼\n┴┬┴／＼　／　　　　　　﹨\n┬┴∕　　　　　　　／　　　）\n┴┬▏　　　　　　　　●　　▏\n┬┴▏　　　　　　　　　　　▔█\n┴◢██◣　　　　　＼＿＿＿／\n┬█████◣　　　　　　　／　\n┴█████████████◣\n◢██████████████▆▄\n█◤◢██◣◥█████████◤＼\n◥◢████　████████◤\n');
console.log('┬┴┬┴▏　　▏▔▔▔▔＼\n');
console.log('┴┬┴／＼　／　　　　　　﹨\n');
console.log('┬┴∕　　　　　　　／　　　）\n');
console.log('┴┬▏　　　　　　　　●　　▏\n');
console.log('┬┴▏　　　　　　　　　　　▔█\n');
console.log('┴◢██◣　　　　　＼＿＿＿／\n');
console.log('┬█████◣　　　　　　　／　\n');
console.log('┴█████████████◣\n');
console.log('◢██████████████▆▄\n');
console.log('█◤◢██◣◥█████████◤＼\n');
console.log('◥◢████　████████◤\n');
console.log('探寻这里的秘密；\n成为这里的主人；\n体验这里的挑战；\n加入金融魔方，你，可以影响世界。\n');

// import asyncFiles from './utils/asyncFiles';
require('../less/common.less');
// console.log(asyncFiles);

$.fn.extend({
    animateCss: function(animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
        return this;
    }
});

$(function() {
    // console.log(Base.asyncFiles.jsfiles);
    //
    // asyncFiles.asyncLoadJs(Base.asyncFiles.jsfiles)
    // asyncFiles.syncLoadCss(Base.asyncFiles.cssfiles)
    // asyncFiles.syncLoadCss(['index'])
    //
    var url = window.location.href;
    if (url.indexOf("product/") >= 0) {
        $(".menu .active").each(function() {
            $(this).removeClass("active");
        })
        $("#product").addClass("active");
    }
    if (url.indexOf("developsDoc/download.html") >= 0) {
        $(".menu .active").each(function() {
            $(this).removeClass("active");
        })
        $("#download").addClass("active");
    }
    if (url.indexOf("developsDoc/index.html") >= 0) {
        $(".menu .active").each(function() {
            $(this).removeClass("active");
        })
        $("#developsdoc").addClass("active");
    }
    if (url.indexOf("aboutUs.html") >= 0) {
        $(".menu .active").each(function() {
            $(this).removeClass("active");
        })
        $("#aboutus").addClass("active");
    }
    if (url.indexOf("news.html") >= 0) {
        $(".menu .active").each(function() {
            $(this).removeClass("active");
        })
        $("#news").addClass("active");
    }
    if(url.indexOf("login.html") >= 0 || url.indexOf("emailReg.html") >= 0){
        $(".menu .active").each(function() {
            $(this).removeClass("active");
        })
    }
})
