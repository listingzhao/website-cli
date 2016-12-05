'use strict';

require('../less/insure.less');

let $ = require('jquery'),
    validate = require("./utils/validate"),
    methods = validate.methods;
let slide = require('slide');

$("#multipleColumn").slide({titCell:".hd ul",mainCell:".bd .list",autoPage:true, effect:"leftLoop", autoPlay:true,mouseOverStop:false, vis:5});

/**
 * [$ description]
 * @param  {[type]} '.fea-con' [description]
 * @return {[type]}            [description]
 */
$('.fea-con').find('.site1_show').each(function(item){
  $(this).hover(function(){
    clearInterval(timer);
    curIndex = item;
    var index = $('.fea-con .site1_show').index($(this));
    var $tab = $('.sub-con').find('div').eq(index);
    $(this).addClass('selected').siblings().removeClass('selected');
    $tab.addClass('selected').siblings().removeClass('selected');
    showSite(curIndex);
  },function() {
    reseTimer();
  });
})

var curIndex = 0;
var sites = $('.fea-con .site1_show');
var count = sites.length;

function showSite(index) {
  var $site = $('.fea-con .site1_show').eq(index);
  var $tab = $('.sub-con').find('div').eq(index);
  $site.addClass('selected').siblings().removeClass('selected');
  $tab.addClass('selected').siblings().removeClass('selected');
}

showSite(curIndex);

var timer = setInterval(function(){
  if(curIndex < count - 1) {
    curIndex++;
  }else {
    curIndex=0;
  }
  showSite(curIndex);
},3000);

function reseTimer() {
  timer = setInterval(function(){
    if(curIndex < count - 1) {
      curIndex++;
    }else {
      curIndex=0;
    }
    showSite(curIndex);
  },3000);
}

$('#qr_btn').on('click', function(e){
  e.stopPropagation();
  $('.inscure-banner').addClass('show');
  $('.qr-box').addClass('show');
})

$('.inscure-banner').on('click',function(){
  $('.inscure-banner').removeClass('show');
  $('.qr-box').removeClass('show');
});

var p= 0,t=0;
function scrollT(){
    p=$(window).scrollTop();
    var posy = p / 1300 ;
    if(posy > 0.7 ){
      posy = 0.7;
    }else if ( posy < 0.3){
      posy = 0.3;
    }
    var fullposy = p / 2700;
    if(fullposy > 0.7){
      fullposy = 0.7;
    }else if ( fullposy < 0.3){
      fullposy = 0.3;
    }
    // console.log(p)
    if(p>0){
      $("#j-fixed-nav").addClass("nav-fixed");
      $('.inscure-banner').removeClass('show');
      $('.qr-box').removeClass('show');
    }else{
      $("#j-fixed-nav").removeClass("nav-fixed");
    }
    if(p < 300) {
      var oval = p * 0.003 ,hidev= 1 - p * 0.003;
      $('.site1_show').css({'opacity': oval});
    }else {
      $('.site1_show').css({'opacity': 1});
    }
    $('.sec-insure-third').css({'background-position-y':  posy * 100 +'%'});
    $('.explain__full').css({'background-position-y':  fullposy * 100 +'%'});

    var opacity =  p * 0.0022,  //300  1
    opacity2 = p * 0.0026,  // 300    0.84
    opacity3 = p * 0.0032,    // 300   0.68
    opacity4 = p * 0.0040,    // 300    0.52
    opacity5 = p * 0.0050,    // 300   0.36
    opacity6 = p * 0.0060,    // 300   0.2
    trans1 = (300 - p) * 0.0133, trans2 = (300 - p) * 0.0266,trans3 = (300 - p) * 0.0424,trans4 = (300 - p) * 0.0666,trans5 = (300 - p) * 0.0766, trans6 = (300 - p) * 0.0877 ;
    opacity = opacity > 1 ? 1 : opacity;
    opacity2 = opacity2 > 1 ? 1 : opacity2;
    opacity3 = opacity3 > 1 ? 1 : opacity3;
    opacity4 = opacity4 > 1 ? 1 : opacity4;
    opacity5 = opacity5 > 1 ? 1 : opacity5;
    opacity6 = opacity6 > 1 ? 1 : opacity6;
    trans6 = -trans6 > 0 ? 0 : trans6;
    trans1 = -trans1 > 0 ? 0 : trans1;
    trans2 = -trans2 > 0 ? 0 : trans2;
    trans3 = -trans3 > 0 ? 0 : trans3;
    trans4 = -trans4 > 0 ? 0 : trans4;
    trans5 = -trans5 > 0 ? 0 : trans5;
    $('.iconwall-item').eq(0).css({'opacity': opacity6,'transform': "translate(0%, "+ - trans1+"%) translate3d(0px, 0px, 0px)"})
    $('.iconwall-item').eq(1).css({'opacity': opacity5,'transform': "translate(0%, "+ - trans2+"%) translate3d(0px, 0px, 0px)"})
    $('.iconwall-item').eq(2).css({'opacity': opacity4,'transform': "translate(0%, "+ - trans3+"%) translate3d(0px, 0px, 0px)"})
    $('.iconwall-item').eq(3).css({'opacity': opacity3,'transform': "translate(0%, "+ - trans4+"%) translate3d(0px, 0px, 0px)"})
    $('.iconwall-item').eq(4).css({'opacity': opacity2,'transform': "translate(0%, "+ - trans5+"%) translate3d(0px, 0px, 0px)"})
    $('.iconwall-item').eq(5).css({'opacity': opacity,'transform': "translate(0%, "+ - trans6+"%) translate3d(0px, 0px, 0px)"})
}
$(window).scroll(function(){
    scrollT();
});
scrollT();
