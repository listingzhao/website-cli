'use strict';

require('../less/news.less');

let $ = require('jquery'),
    validate = require("./utils/validate"),
    methods = validate.methods;

var p= 0,t=0;
function scrollT(){
    p=$(window).scrollTop();
    // console.log(p)
    if(p>700) {
      $("#j-fixed-nav").addClass("nav-fixed").removeClass("about-nav");
    }else {
      $("#j-fixed-nav").removeClass("nav-fixed").addClass("about-nav");
    }

}
$(window).scroll(function(){
    scrollT();
});
scrollT();
