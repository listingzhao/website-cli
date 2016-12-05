'use strict';

require('../less/login.less');
require('../less/register.less');

let $ = require('jquery'),
    validate = require("./utils/validate"),
    methods = validate.methods;
let slide = require('slide');


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

const $tip = $(".toast-form-err");
var stat = 0;

var errorMsg = '${errormsg}';

if(errorMsg) {
  $tip.show();
}

$(".form-control").keypress(function() {
    $(this).closest('.form-group').removeClass('has-error').removeClass('has-success');
    $(this).siblings('.help-block').text("").hide();
})

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
        self.closest('.form-group').addClass('has-success')
        self.siblings('.help-block').hide()
    }
})

/**
 * [name 确认密码]
 * @type {String}
 */
$("[name='crmpassword']").blur(function() {
    let self = $(this)
    let value = $.trim($(this).val());
    if (value) {
        if (value != $.trim($('[name="password"]').val())) {
            self.siblings('.help-block').text("两次密码输入不一致").show()
            self.closest('.form-group').addClass('has-error')
            return false;
        } else {
            self.closest('.form-group').addClass('has-success')
            self.siblings('.help-block').hide()
        }
    }
});

/**
 * [name 重置密码]
 * @type {String}
 */
$("#js-btn").on('click', function() {
		if(!$.trim($("[name='password']").val())){
      $('input[name="password"]').siblings('.help-block').text("请输入密码").show()
      $('input[name="password"]').closest('.form-group').addClass('has-error')
			return false;
		}

		if (!methods.isPwd($.trim($("[name='password']").val()))) {
      $('input[name="password"]').siblings('.help-block').text("密码只能由英文、数字及标点符号组成").show()
      $('input[name="password"]').closest('.form-group').addClass('has-error')
			return false;
		}
		if (!methods.betweenLength($.trim($("[name='password']").val()), 20, 6)) {
      $('input[name="password"]').siblings('.help-block').text("密码长度只能在6-20位字符之间").show()
      $('input[name="password"]').closest('.form-group').addClass('has-error')
			return false;
		}
		if (methods.simplePwd($.trim($("[name='password']").val()))) {
      $('input[name="password"]').siblings('.help-block').text("密码是6-20位字符，且字母、数字、标点符号至少包括两种").show()
      $('input[name="password"]').closest('.form-group').addClass('has-error')
			return false;
		}
    if(!$.trim($("[name='crmpassword']").val())){
      $('input[name="crmpassword"]').siblings('.help-block').text("请再次输入新密码").show()
      $('input[name="crmpassword"]').closest('.form-group').addClass('has-error')
			return false;
		}
		if($.trim($('[name="crmpassword"]').val()) != $.trim($('[name="password"]').val())){
      $('input[name="crmpassword"]').siblings('.help-block').text("两次密码输入不一致").show()
      $('input[name="crmpassword"]').closest('.form-group').addClass('has-error')
			return false;
		}
		$("#form").submit();
	});
