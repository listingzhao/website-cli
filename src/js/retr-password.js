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

var emailExist = 0;

var errorMsg = '${errormsg}';

if(errorMsg) {
  $tip.show();
}

$(".form-control").keypress(function() {
    $(this).closest('.form-group').removeClass('has-error').removeClass('has-success');
    $(this).siblings('.help-block').text("").hide();
})

/**
 * [name 邮箱验证]
 * @type {String}
 */
$("[name='email']").blur(function() {
    let self = $(this);
    let value = $.trim($(this).val())
    if (value) {
        if (!methods.isEmail(value)) {
            self.siblings('.help-block').text('请您输入正确的邮箱地址').show()
            self.closest('.form-group').addClass('has-error')
            return false;
        } else {
            $.ajax({
                url: Base.domain + "/passport/existUserByEmail.html",
                type: "post",
                async: false,
                data: {
                    column: value
                },
                success: function(data) {
                    if (data.status == 'success') {
                        self.siblings('.help-block').text('该邮箱不存在').show()
                        self.closest('.form-group').addClass('has-error')
                        emailExist = 0;
                        return false;
                    } else {
                        emailExist = 1;
                        self.siblings('.help-block').hide();
                        self.closest('.form-group').addClass('has-success');
                    }
                }
            });
        }
    }else {
      self.removeClass('error').removeClass('has-success')
    }
});
/**
 * [name 发送邮件重置密码]
 * @type {String}
 */
$("#js_btn").on('click', function() {
    if (!$.trim($("[name='email']").val())) {
        $('input[name="email"]').siblings('.help-block').text("请输入邮箱地址").show()
        $('input[name="email"]').closest('.form-group').addClass('has-error')
        return false;
    }
    if (!methods.isEmail($.trim($("[name='email']").val()))) {
        $('input[name="email"]').siblings('.help-block').text("请您输入正确的邮箱地址").show()
        $('input[name="email"]').closest('.form-group').addClass('has-error')
        return false;
    }
    if (emailExist == 0) {
        $('input[name="email"]').siblings('.help-block').text("该邮箱不存在").show()
        $('input[name="email"]').closest('.form-group').addClass('has-error')
        return false;
    }
    $("#form").submit();
});
