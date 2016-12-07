'use strict';

require('../less/login.less');
require('../less/register.less');

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

var $tip = $(".toast-form-err");
var curIndex = 0;
var imgs = $('.img-list .img_box');
var count = imgs.length;

var errorMsg = '${errormsg}';

if(errorMsg) {
  $tip.show();
}

function showPics(n) {
    imgs.eq(n).fadeIn(2000).siblings(".img_box").fadeOut(2000);
}

var timer = setInterval(function() {
    if (curIndex < count - 1) {
        curIndex++;
    } else {
        curIndex = 0;
    }
    showPics(curIndex);
}, 5000);

function reseTimer() {
    timer = setInterval(function() {
        if (curIndex < count - 1) {
            curIndex++;
        } else {
            curIndex = 0;
        }
        showPics(curIndex);
    }, 5000);
}

$(".form-control").keypress(function() {
    $(this).closest('.form-group').removeClass('has-error').removeClass('has-success');
    $(this).siblings('.help-block').text("").hide();
})

$('.j-checkbox-box').on('click', function() {
    $('.fx-checkbox').toggleClass("active");
    if($('.fx-checkbox').hasClass("active")) {
      $('#persist_state').val(true)
    }else {
      $('#persist_state').val(false)
    }
});

	var stat=1;
	$("[name='email']").blur(function(){
    let self = $(this)
		let value=$.trim($(this).val())
		if(value){
			if (!methods.isEmail(value)) {
        self.siblings('.help-block').text("邮箱格式不正确").show()
        self.closest('.form-group').addClass('has-error')
				return false;
			}else{
				self.siblings('.help-block').text("").hide()
				$.ajax({
					url: "/api/passport/existUserByEmail",
					type: "post",
					data: {
						column: value
					},
					success: function(data) {
						if (data.status == 'failed') {
              self.siblings('.help-block').hide();
              self.closest('.form-group').addClass('has-success');
							stat=1;
							return true;
						} else {
              self.siblings('.help-block').text('该邮箱不存在').show()
              self.closest('.form-group').addClass('has-error')
							stat=0;
							return false;
						}
					},
					error: function() {
						self.siblings('.help-block').text("网络异常").show()
						return false;
					}
				});
			}
		}
	});

  /**
   * [name 密码验证]
   * @type {String}
   */
  $("[name='password']").on('blur', function() {
      let self = $(this)
      let value = $.trim($(this).val())
      if (value) {
          if (!methods.isPwd(value)) {
              self.siblings('.help-block').text("密码只能由英文、数字及标点符号组成").show()
              self.closest('.form-group').addClass('has-error')
              return false;
          }
          if (!methods.betweenLength(value, 20, 6)) {
              self.siblings('.help-block').text("密码长度只能在6-20位字符之间").show()
              self.closest('.form-group').addClass('has-error')
              return false;
          }
          if (methods.simplePwd(value)) {
              self.siblings('.help-block').text("密码是6-20位字符，且字母、数字、标点符号至少包括两种").show()
              self.closest('.form-group').addClass('has-error')
              return false;
          }
          self.closest('.form-group').addClass('has-success');
      }
  })

  /**
   * [name 登录]
   * @type {String}
   */
	$("#login-btn").on("click", function() {
    let $email = $("[name='email']"), emailValue = $.trim($email.val());
    let $password = $("[name='password']"), passwordValue = $.trim($password.val());
		if(!emailValue){
      $email.siblings('.help-block').text("请输入邮箱地址").show()
      $email.closest('.form-group').addClass('has-error')
			return false;
		}
		if (!methods.isEmail(emailValue)) {
      $email.siblings('.help-block').text("请您输入正确的邮箱地址").show()
      $email.closest('.form-group').addClass('has-error')
			return false;
		}
		if(stat==0){
      $email.siblings('.help-block').text("该邮箱不存在").show()
      $email.closest('.form-group').addClass('has-error')
			return false;
		}
		if(!passwordValue){
      $password.siblings('.help-block').text("请输入密码").show()
      $password.closest('.form-group').addClass('has-error')
			return false;
		}
    if (!methods.isPwd(passwordValue)) {
        $password.siblings('.help-block').text("密码只能由英文、数字及标点符号组成").show()
        $password.closest('.form-group').addClass('has-error')
        return false;
    }
    if (!methods.betweenLength(passwordValue, 20, 6)) {
        $password.siblings('.help-block').text("密码长度只能在6-20位字符之间").show()
        $password.closest('.form-group').addClass('has-error')
        return false;
    }
    if (methods.simplePwd(passwordValue)) {
        $password.siblings('.help-block').text("密码是6-20位字符，且字母、数字、标点符号至少包括两种").show()
        $password.closest('.form-group').addClass('has-error')
        return false;
    }
		$("#form").submit();
	});
