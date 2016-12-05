'use strict';

console.info('require wallet index.');

require('../less/common.less');
require('../less/wallet.less');

let $ = require('jquery'),
    validate = require("./utils/validate"),
    methods = validate.methods;

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
    $tab.fadeIn(500).addClass('selected').siblings().fadeOut(500).removeClass('selected');
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
  $tab.fadeIn(500).addClass('selected').siblings().fadeOut(500).removeClass('selected');
}

showSite(curIndex);

var timer = setInterval(function(){
  if(curIndex < count - 1) {
    curIndex++;
  }else {
    curIndex=0;
  }
  showSite(curIndex);
},5000);

function reseTimer() {
  timer = setInterval(function(){
    if(curIndex < count - 1) {
      curIndex++;
    }else {
      curIndex=0;
    }
    showSite(curIndex);
  },5000);
}

var p= 0,t=0;
function scrollT(){
    p=$(window).scrollTop();
    var posy = p / 1950 ;
    if(posy > 0.7 ){
      posy = 0.7;
    }else if ( posy < 0.3){
      posy = 0.3;
    }
    // console.log(p)
    if(p>0){
      $("#j-fixed-nav").addClass("nav-fixed");
    }else{
      $("#j-fixed-nav").removeClass("nav-fixed");
    }
    if(p < 300) {
      var oval = p * 0.003 ,hidev= 1 - p * 0.003;
      $('.site1_show').css({'opacity': oval});
      $('.site1_hide').css({'opacity': hidev});
      $('.sub-con').hide();
    }else {
      $('.site1_show').css({'opacity': 1});
      $('.site1_hide').css({'opacity': 0});
      $('.sub-con').show();
    }
    $('.sec-wallet-third').css({'background-position-y':  posy * 100 +'%'});
}
$(window).scroll(function(){
    scrollT();
});
scrollT();
