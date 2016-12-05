'use strict';

console.info('require dev-doc index.');

require('../less/dev-doc.less');

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
    scrllDoc();
});

scrollT();

$('.toc a').each(function(index, ele) {
    let hrefStr = $(ele).attr('href');
    let $bk = $(hrefStr);
    let sTop = $(window).scrollTop();
    let mTop = $bk[0].offsetTop;
    let resTop = mTop - sTop;
    if (resTop > 0 && resTop <= 500) {
        let $curLi = $(ele).closest("li");
        let $preLi = $(ele).closest("li").siblings("li");
        $('.toc').find('[href="' + hrefStr + '"]').addClass('active').siblings().removeClass('active');
        if (!$curLi.hasClass('current')) {
            // current
            $curLi.addClass("current")
            $curLi.find(".toc").slideDown()
            // pre
            $preLi.removeClass("current")
            $preLi.find(".toc").slideUp()
        }
        return false;
    }
})

function scrllDoc() {
    $('.toc a').each(function(index, ele) {
        let hrefStr = $(ele).attr('href');
        let $bk = $(hrefStr);
        let sTop = $(window).scrollTop();
        let mTop = $bk[0].offsetTop;
        let resTop = mTop - sTop;
        if (resTop > 0 && resTop <= 90) {
            let $curLi = $(ele).closest("li");
            let $preLi = $(ele).closest("li").siblings("li");
            if(!$(ele).hasClass('active')){
              $(ele).addClass('active').siblings().removeClass('active');
            }
            if (!$curLi.hasClass('current')) {
                // current
                $curLi.addClass("current")
                $curLi.find(".toc").slideDown()
                // pre
                if($preLi.hasClass('current')){
                  $preLi.find(".toc").slideUp()
                  $preLi.removeClass("current")
                }
            }
            return false;
        }
    })
}

$('.toc a,.cate').click(function() {
    var hr = $(this).attr('href');
    $(this).addClass('active').siblings().removeClass('active');
    var anh;
    anh = $(hr).offset().top - 80;
    $('html,body').stop().animate({
        scrollTop: anh
    }, 10);
});

$("[data-trigger-sub]").click(function() {
    $('.cate').siblings(".toc").find('a').removeClass('active')
    var _self = $(this), dli = _self.parents("li");
    if (!_self.parents("li").hasClass("current")) {
      _self.siblings(".toc").slideDown();
      dli.addClass("current");
      dli.siblings("li").removeClass("current");
      dli.siblings("li").children(".toc").slideUp();
    }
});
var w = ($(window).width() - 1180) / 2;
$(".nav-left").css("left", w);
