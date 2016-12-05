'use strict';

require('../less/download.less');

let $ = require('jquery'),
    validate = require("./utils/validate"),
    methods = validate.methods;

var p = 0,
    t = 0;
function scrollT() {
    p = $(window).scrollTop();
    if (p > 0) {
        $("#j-fixed-nav").addClass("nav-fixed");
    } else {
        $("#j-fixed-nav").removeClass("nav-fixed");
    }
}
$(window).scroll(function() {
    scrollT();
});
scrollT();
