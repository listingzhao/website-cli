'use strict';

console.log('index.js');

require('../less/index.less');

let $ = require('jquery'),
    validate = require("./utils/validate"),
    methods = validate.methods;
let slide = require('slide');

$("#multipleColumn").slide({titCell:".hd ul",mainCell:".bd .list",autoPage:true, effect:"leftLoop", autoPlay:true,mouseOverStop:false, vis:5});
$(".txtScroll-top").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true, effect:"topLoop",autoPlay:true,mouseOverStop:false, vis:1});

var curIndex = 0;
var imgs = $('#banner .img-list');
var count = imgs.length;

function showPics(n) {
  var $li = $('.btn-dot').find('li').eq(n);
  $li.addClass('hover').siblings().removeClass('hover')
  imgs.eq(n).fadeIn(2000).siblings(".img-list").fadeOut(2000);
}

var timer = setInterval(function(){
  if(curIndex < count - 1) {
    curIndex++;
  }else {
    curIndex=0;
  }
  showPics(curIndex);
},8000);

function reseTimer() {
  timer = setInterval(function(){
    if(curIndex < count - 1) {
      curIndex++;
    }else {
      curIndex=0;
    }
    showPics(curIndex);
  },8000);
}

// $('#line_box').animate({ width: '239px' }, 400);

$('.btn-dot').find('li').each(function(item){
  $(this).hover(function(){
    clearInterval(timer);
    curIndex = item;
    $(this).addClass('hover').siblings().removeClass('hover');
    showPics(curIndex);
  },function() {
    reseTimer();
  });
})

/**
 * [$ product-tab切换]
 * @param  {[type]} '.four-tabs a'            [description]
 * @return {[type]}             [description]
 */
$('.four-tabs a').mouseover(function(){
  var index = $('.four-tabs li').index($(this).parent());
  var $tab = $('.text-info').find('.tab').eq(index);
  var $pbg = $('.pic-info').find('.picture').eq(index);
  $(this).addClass('selected');
  $(this).parent().siblings().find('a').removeClass('selected');
  $tab.fadeIn(200).addClass('selected').siblings('.tab').fadeOut(200).removeClass('selected');
  $pbg.fadeIn(200).addClass('selected').siblings().fadeOut(200).removeClass('selected');

});

var p= 0,t=0;
function scrollT(){
    p=$(window).scrollTop();
    if(p>0){
      $("#j-fixed-nav").addClass("nav-fixed");
    }else{
      $("#j-fixed-nav").removeClass("nav-fixed");
    }
    if(p > 1800) {
      $('#line_box').addClass('lines-show');
    }
    // console.log('p:' + p);
}
$(window).scroll(function(){
    scrollT();
});
scrollT();
