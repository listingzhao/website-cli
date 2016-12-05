'use strict';

console.info('require page index.');

// require('../scss/home.scss');



let $ = require('jquery'),
    validate = require("./utils/validate"),
    methods = validate.methods;
let slide = require('slide');
console.log($)
console.log(slide)

$("#multipleColumn").slide({titCell:".hd ul",mainCell:".bd .list",autoPage:true, effect:"leftLoop", autoPlay:true, vis:5});

$('.orbit-container').find('.orbit-slide').each(function(item) {
  var $this = $(this), slide = $this.data('slide');
})

var index = 0;
var sliders = $('.orbit-container').find('.orbit-slide');

function changePics(slide) {
    var preIndex = slide == 0 ? sliders.length - 1 : slide - 1;
    var $li = $('.orbit-container').find('.orbit-slide').eq(slide),curSlide = sliders.eq(slide), preSlide = sliders.eq(preIndex);
    curSlide.addClass('is-active sliderightin').css({'position':'absolute','max-height':'480px','top':'0px','display': 'block'})
    preSlide.removeClass('is-active').addClass('slideleftout');
    preSlide.on('webkitAnimationEnd',function(){
      $(this).removeClass('slideleftout').css({'position':'relative','max-height':'480px','top':'0px','display': 'none'})
    })
    curSlide.on('webkitAnimationEnd',function(){
      $(this).removeClass('sliderightin').css({'position':'relative','max-height':'480px','top':'0px','display': 'block'})
    })
}



var timer2 = setInterval(function(){
  if(index < sliders.length - 1){
    index++;
  }else {
    index = 0;
  }
  changePics(index)
},5000)

var curIndex = 0;
var imgs = $('#banner .img-list');
var count = imgs.length;

function showPics(n) {
  var $li = $('.btn-dot').find('li').eq(curIndex);
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
},3000);

function reseTimer() {
  timer = setInterval(function(){
    if(curIndex < count - 1) {
      curIndex++;
    }else {
      curIndex=0;
    }
    showPics(curIndex);
  },3000);
}

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



$('.four-tabs a').hover(function(){
  var index = $('.four-tabs li').index($(this).parent());
  var $tab = $('.text-info').find('.tab').eq(index);
  $(this).addClass('selected');
  $tab.addClass('selected').siblings().removeClass('selected');
},function() {
  $(this).removeClass('selected');
})

//
var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    parallax: true,
    speed: 800,
    autoplay: 3000,
    loop:true
});

var p= 0,t=0;
function scrollT(){
    p=$(window).scrollTop();
    if(p>0){
      $("#j-fixed-nav").addClass("nav-fixed");
    }else{
      $("#j-fixed-nav").removeClass("nav-fixed");
    }
}
$(window).scroll(function(){
    scrollT();
});
scrollT();

//关闭问卷
$("[data-close]").on("click",function(){
    $("#popbg,#popwin").hide();
});
function showPop(){
    $("#popwin").css('margin-top',-($("#popwin").height()/2));
    $("#popbg,#popwin").show();
}
//
$("#js_note").on('click', function() {
    var _html="";
    _html+='<a href="javascript:void(0)" class="close" data-close>关闭</a>';
    _html+='<div class="title text-center">用户反馈</div>';
    _html+='<div class="con">';
    _html+='<div class="item">';
    _html+='<label class="t">公&nbsp;&nbsp;&nbsp;司：</label>';
    _html+='<input type="text" class="txt" name="company" maxlength="100"/>';
    _html+='</div>';
    _html+='<div class="item">';
    _html+='<label class="t">姓&nbsp;&nbsp;&nbsp;名：</label>';
    _html+='<input type="text" class="txt" name="username" maxlength="20"/>';
    _html+='</div>';
    _html+='<div class="item">';
    _html+='<label class="t">手机号：</label>';
    _html+='<input type="text" class="txt" name="mobileno" maxlength="20"/>';
    _html+='</div>';
    _html+='<div class="item">';
    _html+='<label class="t">邮&nbsp;&nbsp;&nbsp;箱：</label>';
    _html+='<input type="text" class="txt" name="email" maxlength="30"/>';
    _html+='</div>';
    _html+='<p class="des-t">问题描述：</p>';
    _html+='<div class="des">';
    _html+='<textarea class="txt" id="description" maxlength="500"></textarea>';
    _html+='</div>';
    _html+='<p class="error"></p>';
    _html+='<input type="button" class="btn" value="提交" id="js_btn" />';
//        _html+='<div class="text-right">';
//       _html+='<a href="'+Base.domain+'/developsDoc/index.html" target="_blank" class="ck">查看帮助中心</a>';
//      _html+='</div>';
    _html+='</div>';
    $("#popwin").empty().append(_html);
    showPop();
});
$("#popwin .txt").on("focusin",function() {
    $("#popwin .error").text("");
});

$("#js_btn").on('click', function() {
    var company=$.trim($("[name='company']").val()),
        username=$.trim($("[name='username']").val()),
        mobileno=$.trim($("[name='mobileno']").val()),
        email=$.trim($("[name='email']").val()),
        description=$.trim($("#description").val());
    var errormsg=$(".error");
    if(company==''){
        errormsg.text('请填写公司名称');
        return false;
    }
    if(username==''){
        errormsg.text('请填写姓名');
        return false;
    }
    if(mobileno==''){
        errormsg.text('请填写手机号码');
        return false;
    }
    if(!methods.isMobile(mobileno)){
        errormsg.text('手机号码格式不正确');
        return false;
    }
    if(email==''){
        errormsg.text('请填写邮箱');
        return false;
    }
    if(!methods.isEmail(email)){
        errormsg.text('邮箱格式不正确');
        return false;
    }
    if(description==''){
        errormsg.text('问题描述不能为空');
        return false;
    }
    $.ajax({
        url: Base.domain + "/apply/fedbackSubmit.html?r=" + Math.random(),
        type: "post",
        async: false,
        data: {
            company: company,
            username: username,
            mobileno: mobileno,
            email: email,
            description: description
        },
        success: function(data) {
            if (data.status == 'failed') {
                errormsg.text(data.respmsg);
                return false;
            } else {
                var _html='';
                _html+='<a href="javascript:void(0)" class="close" data-close>关闭</a>';
                _html+='<div class="con text-center">';
                _html+='<span class="suc-ic"></span>';
                _html+='<p class="text-x-large">提交成功</p>';
                _html+='<p class="text-large text-gray">我们会在三个工作日内与您联系</p>';
                _html+='</div>';
                $("#popwin").empty().append(_html);
                showPop();
            }

        }
    });
});
