'use strict';

require('animate.css')
require('../less/packet.less')

let $ = require('jquery'),
    validate = require("./utils/validate"),
    methods = validate.methods;
let slide = require('slide');

$('.orbit-container').find('.orbit-slide').each(function(item) {
    var $this = $(this),
        slide = $this.data('slide');
})

var msgarray = ['', '是的，不只是IM红包，还有更好玩的运营红包，让每一个App都能发红包！', '放心吧，红包SDK拥有成熟的技术接口，只需要双方简单调试，最快3小时就能上线了!', ''];
var msgarray2 = ['哇！任何场景的App都可以实现吗？', '技术对接复杂吗？开发周期呢？', '太棒了！这样就能更加丰富运营工具，活跃用户了！', ''];

var con = $('.screen1 .message-input .message-area').find('span');
var strindex = 0;
var codeindex = 0;
var tId = null;
var s,
    length;

function start() {
    if (strindex == msgarray.length) {
        return;
    }
    codeindex = 0;
    s = msgarray[strindex];
    length = s.length;
    strindex++;
    con.text('');
    // console.log('s1:'+s)
    // console.log(codeindex)
    // console.log(length)
    tId = setInterval(function() {
        con.append(s.charAt(codeindex));
        if (codeindex++ === length) {
            con.text('');
            clearInterval(tId);
            // 消息显示
            var $obj1 = $('.screen1 .nextShow1'),
                $obj2 = $('.screen2 .nextShow1');
            $obj1.next().addClass('nextShow1')
            $obj1.animate({
                marginTop: '0px'
            }, 400).removeClass('nextShow1');

            setTimeout(function() {
                $obj2.next().addClass('nextShow1')
                $obj2.animate({
                    marginTop: '0px'
                }, 400).removeClass('nextShow1');
            }, 500)

            // console.log('strindex2:' + strindex2)
            if (strindex >= 2) {
                $('.message-list').addClass('pR0 dis_scroll');
                $('.message-scroll').addClass('oS');

                // console.log($obj1.position().top + $('#scroll').scrollTop());
                // console.log($obj1[0].offsetHeight);
                // console.log($('#scroll')[0].clientHeight);
                // console.log("scrollTop:" + $('#scroll').scrollTop())
                // 元素距离父元素的距离+元素自身高度-滚动区域高度 = 滚动条滚动距离
                if ($obj1.position()) {
                    var scroll1 = $obj1.position().top + $('#scroll').scrollTop() + $obj1[0].offsetHeight - ($('#scroll')[0].clientHeight - 12);
                }
                if ($obj2.position()) {
                    var scroll2 = $obj2.position().top + $('.message-scroll2').scrollTop() + $obj2[0].offsetHeight - ($('.message-scroll2')[0].clientHeight - 12);
                }
                $('#scroll').scrollTop(scroll1);
                $('.message-scroll2').scrollTop(scroll2);
            }
            if (strindex == 1) { //第一次红包对话
                //显示你已领取了红包
                setTimeout(function() {
                    $('.mofang-js-get').show();
                }, 2000);
            }

            setTimeout(function() {
                show2()
                $('.pter-js-get').show();
            }, 3000);
        }
    }, 100);
}

var con2 = $('.screen2 .message-input .message-area2').find('span');
var s2;
var strindex2 = 0;
var tId2 = null;

function show2() {

    if (strindex2 == msgarray2.length) {
        return;
    }
    codeindex = 0;
    s2 = msgarray2[strindex2];
    var length = s2.length
    strindex2++;
    con2.text('');
    // console.log('s2:'+s2)
    // console.log(codeindex)
    // console.log(length)
    tId2 = setInterval(function() {
        con2.append(s2.charAt(codeindex));
        if (codeindex++ === length) {
            con2.text('');
            clearInterval(tId2);
            //消息显示
            var $obj1 = $('.screen1 .nextShow1'),
                $obj2 = $('.screen2 .nextShow1');
            $obj2.next().addClass('nextShow1')
            $obj2.animate({
                marginTop: '0px'
            }, 400).removeClass('nextShow1');
            setTimeout(function() {
                $obj1.next().addClass('nextShow1')
                $obj1.animate({
                    marginTop: '0px'
                }, 400).removeClass('nextShow1');
            }, 500)

            if (strindex2 >= 2) {
                $('.message-list').addClass('pR0 dis_scroll');
                $('.message-scroll').addClass('oS');
                // console.log($obj1.position().top + $('#scroll').scrollTop());
                // console.log($obj1[0].offsetHeight);
                // console.log($('#scroll')[0].clientHeight);
                // console.log("scrollTop:" + $('#scroll').scrollTop())
                if ($obj1.position()) {
                    var scroll1 = $obj1.position().top + $('#scroll').scrollTop() + $obj1[0].offsetHeight - ($('#scroll')[0].clientHeight - 12);
                }
                if ($obj2.position()) {
                    var scroll2 = $obj2.position().top + $('.message-scroll2').scrollTop() + $obj2[0].offsetHeight - ($('.message-scroll2')[0].clientHeight - 12);
                }
                // console.log($obj1.position().top + $('#scroll').scrollTop() + $obj1[0].offsetHeight - ($('#scroll')[0].clientHeight - 12))
                $('#scroll').scrollTop(scroll1);
                $('.message-scroll2').scrollTop(scroll2);
            }
            setTimeout(function() {
                start()
            }, 3000);
        }
    }, 100)
}

setInterval(function() {
    strindex = 0;
    strindex2 = 0;
    $('.message-list').removeClass('pR0');
    $('.message-scroll').removeClass('oS');
    $('.message-scroll li').first().addClass('nextShow1')
    $('.message-scroll2 li').first().addClass('nextShow1')
    $('.pter-js-get').hide();
    $('.mofang-js-get').hide();
    start();
}, 40000);

start();

var index = 0;
var sliders = $('.orbit-container').find('.orbit-slide');

/**
 * [changePics 图片轮播]
 * @param  {[type]}  slide   [description]
 * @param  {Boolean} isClick [description]
 * @return {[type]}          [description]
 */
function changePics(slide, isClick) {
    var actIndex = $('#bullets').find('li.is-active').data('slide');
    // slide 下一页是第一张图并且上一页是最后一张图
    var preIndex = slide == 0 && actIndex == 4
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
    if (slide >= preIndex || (preIndex == 4 && slide == 0 && !isClick)) {
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
    }, 8000)

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
        }, 8000);
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
        if (p > 0) {
            $("#j-fixed-nav").addClass("nav-fixed");
        } else {
            $("#j-fixed-nav").removeClass("nav-fixed");
        }
        // console.log(p)
        if (p > 600 && p < 1300) {
            var tras = (p - 600) * 0.04285;
            $('.phonebg').css({
                'transform': "translate3d(0px, -" + tras + "px, 0px)"
            })
        }
        if (p > 1000 && p < 1250) {
            var scal = 1 - (p - 1000) * 0.00142;
            $('.pshadow').css({
                'transform': "scale(" + scal + ", " + scal + ") translate3d(0px, -" + tras / 2 + "px, 0px)"
            })
            // console.log(scal)
        }
    }
    $(window).scroll(function() {
        scrollT();
    });
    scrollT();
