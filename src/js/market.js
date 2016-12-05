'use strict';

require('animate.css')
require('../less/market.less');

let $ = require('jquery'),
    validate = require("./utils/validate"),
    methods = validate.methods;
let slide = require('slide');

var index = 0;
var sliders = $('.orbit-container').find('.orbit-slide');

function changePics(slide, isClick) {
  var actIndex = $('#bullets').find('li.is-active').data('slide');
  // slide 下一页是第一张图并且上一页是最后一张图
  var preIndex = slide == 0 && actIndex == 2
      ? sliders.length - 1
      : actIndex;
  if (slide == preIndex) {
      // console.log('======')
      return;
  }
  var $li = $('.orbit-container').find('.orbit-slide').eq(slide),
      curSlide = sliders.eq(slide),
      preSlide = sliders.eq(preIndex);
  var $tap = $('#bullets').find('li').eq(slide);
  $tap.addClass('is-active').siblings().removeClass('is-active');
  // console.log('preIndex:' + preIndex);
  // console.log('slide:' + slide);
  // console.log('actIndex:' + actIndex);
  if (slide >= preIndex || (preIndex == 2 && slide == 0 && !isClick)) {
      //slideleftin sliderightin slideleftout sliderightout
      curSlide.addClass('is-active').animateCss('slideInRight').css({'position': 'absolute', 'max-height': '620px', 'top': '0px', 'display': 'block'})
      preSlide.removeClass('is-active').animateCss('slideOutLeft');
  } else {
      curSlide.addClass('is-active').animateCss('slideInLeft').css({'position': 'absolute', 'max-height': '620px', 'top': '0px', 'display': 'block'})
      preSlide.removeClass('is-active').animateCss('slideOutRight');
  }
  preSlide.one('animationend webkitAnimationEnd mozAnimationEnd msAnimationEnd', function() {
      $(this).css({'position': 'relative', 'max-height': '620px', 'top': '0px', 'display': 'none'})
  })
  curSlide.one('animationend webkitAnimationEnd mozAnimationEnd msAnimationEnd', function() {
      $(this).css({'position': 'relative', 'max-height': '620px', 'top': '0px', 'display': 'block'})
  })
}

var timer = setInterval(function() {
        if (index < sliders.length - 1) {
            index++;
        } else {
            index = 0;
        }
        changePics(index, false)
    }, 6000)

    /**
 * [$ 轮播bullets]
 * @param  {[type]} '#bullets' [description]
 * @return {[type]}            [description]
 */
    $('#bullets').find('li').each(function(item) {
      $(this).on('click', function() {
          var actIndex = $('#bullets').find('li.is-active').data('slide');
          // slide 下一页是第一张图并且上一页是最后一张图
          var preIndex = item == 0 && actIndex == 4
              ? sliders.length - 1
              : actIndex;
          var orbit = sliders.eq(preIndex);
          if (orbit.hasClass('slideOutLeft') || orbit.hasClass('slideOutRight') || orbit.hasClass('slideInLeft') || orbit.hasClass('slideInRight')) {
              return false;
          }
          clearInterval(timer)
          index = item;
          changePics(index, true);
          reseTimer();
      })
    })

    function reseTimer() {
        timer = setInterval(function() {
            if (index < sliders.length - 1) {
                index++;
            } else {
                index = 0;
            }
            changePics(index, false)
        }, 6000);
    }

    $('.btn-dot').find('li').each(function(item) {
        $(this).hover(function() {
            clearInterval(timer);
            curIndex = item;
            $(this).addClass('hover').siblings().removeClass('hover');
            showPics(curIndex);
        }, function() {
            reseTimer();
        });
    })

    var p = 0,
        t = 0;
    function scrollT() {
        p = $(window).scrollTop();
        var posy = p / 1300;
        if (posy > 0.7) {
            posy = 0.7;
        } else if (posy < 0.3) {
            posy = 0.3;
        }
        var fullposy = p / 2700;
        if (fullposy > 0.7) {
            fullposy = 0.7;
        } else if (fullposy < 0.3) {
            fullposy = 0.3;
        }
        // console.log(p)
        if (p > 0) {
            $("#j-fixed-nav").addClass("nav-fixed");
            $('.inscure-banner').removeClass('show');
            $('.qr-box').removeClass('show');
        } else {
            $("#j-fixed-nav").removeClass("nav-fixed");
        }
        if (p < 300) {
            var oval = p * 0.003,
                hidev = 1 - p * 0.003;
            $('.site1_show').css({'opacity': oval});
        } else {
            $('.site1_show').css({'opacity': 1});
        }
        if( p < 1200) {
          $('.lines').fadeOut(2000)
        }else {
          $('.lines').fadeIn(2000)
        }
        $('.sec-insure-third').css({
            'background-position-y': posy * 100 + '%'
        });
        $('.explain__full').css({
            'background-position-y': fullposy * 100 + '%'
        });

        var opacity = p * 0.0022, //300  1
            opacity2 = p * 0.0026, // 300    0.84
            opacity3 = p * 0.0032, // 300   0.68
            opacity4 = p * 0.0040, // 300    0.52
            opacity5 = p * 0.0050, // 300   0.36
            opacity6 = p * 0.0060, // 300   0.2
            trans1 = (300 - p) * 0.0133,
            trans2 = (300 - p) * 0.0266,
            trans3 = (300 - p) * 0.0424,
            trans4 = (300 - p) * 0.0666,
            trans5 = (300 - p) * 0.0766,
            trans6 = (300 - p) * 0.0877;
        opacity = opacity > 1
            ? 1
            : opacity;
        opacity2 = opacity2 > 1
            ? 1
            : opacity2;
        opacity3 = opacity3 > 1
            ? 1
            : opacity3;
        opacity4 = opacity4 > 1
            ? 1
            : opacity4;
        opacity5 = opacity5 > 1
            ? 1
            : opacity5;
        opacity6 = opacity6 > 1
            ? 1
            : opacity6;
        trans6 = -trans6 > 0
            ? 0
            : trans6;
        trans1 = -trans1 > 0
            ? 0
            : trans1;
        trans2 = -trans2 > 0
            ? 0
            : trans2;
        trans3 = -trans3 > 0
            ? 0
            : trans3;
        trans4 = -trans4 > 0
            ? 0
            : trans4;
        trans5 = -trans5 > 0
            ? 0
            : trans5;
        $('.iconwall-item').eq(0).css({
            'opacity': opacity6,
            'transform': "translate(0%, " + -trans1 + "%) translate3d(0px, 0px, 0px)"
        })
        $('.iconwall-item').eq(1).css({
            'opacity': opacity5,
            'transform': "translate(0%, " + -trans2 + "%) translate3d(0px, 0px, 0px)"
        })
        $('.iconwall-item').eq(2).css({
            'opacity': opacity4,
            'transform': "translate(0%, " + -trans3 + "%) translate3d(0px, 0px, 0px)"
        })
        $('.iconwall-item').eq(3).css({
            'opacity': opacity3,
            'transform': "translate(0%, " + -trans4 + "%) translate3d(0px, 0px, 0px)"
        })
        $('.iconwall-item').eq(4).css({
            'opacity': opacity2,
            'transform': "translate(0%, " + -trans5 + "%) translate3d(0px, 0px, 0px)"
        })
        $('.iconwall-item').eq(5).css({
            'opacity': opacity,
            'transform': "translate(0%, " + -trans6 + "%) translate3d(0px, 0px, 0px)"
        })
    }
    $(window).scroll(function() {
        scrollT();
    });
    scrollT();
