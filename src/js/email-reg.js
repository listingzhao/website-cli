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

const $tip = $(".toast-form-err");
var stat = 0;

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
        if ($.trim($("[name='crmpassword']").val())) {
            if (value != $.trim($("[name='crmpassword']").val())) {
                $("[name='crmpassword']").siblings('.help-block').text("密码长度只能在6-20位字符之间").show()
                $("[name='crmpassword']").closest('.form-group').addClass('has-error')
                return false;
            } else {
                $("[name='crmpassword']").closest('.form-group').addClass('has-success')
                $("[name='crmpassword']").siblings('.help-block').text("").hide()
            }
        }
        self.closest('.form-group').addClass('has-success')
    } else {
        self.closest('.form-group').removeClass('has-error').removeClass('has-success')
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
    } else {
        self.closest('.form-group').removeClass('has-error').removeClass('has-success')
    }
});

/**
 * [name 验证邮箱]
 * @type {String}
 */
$("[name='email']").blur(function() {
    let value = $.trim($(this).val());
    let str = "该邮箱已经被注册";
    let self = $(this);
    if (value) {
        if (!methods.isEmail(value)) {
            self.siblings('.help-block').text("邮箱格式不正确").show();
            self.closest('.form-group').addClass('has-error')
            return false;
        } else {
            self.siblings('.help-block').text("").hide();
            $.ajax({
                url: Base.domain + "/passport/existUserByEmail.html",
                type: "post",
                async: false,
                data: {
                    column: value
                },
                success: function(data) {
                    if (data.status == 'failed') {
                        self.siblings('.help-block').text(str).show()
                        self.closest('.form-group').addClass('has-error')
                        stat = 0;
                        return false;
                    } else {
                        stat = 1;
                        self.siblings('.help-block').hide();
                        self.closest('.form-group').addClass('has-success');
                    }

                }
            });
        }
    }
});

/**
 * [name 姓名]
 * @type {String}
 */
$("[name='username']").blur(function() {
    var value = $.trim($(this).val());
    var self = $(this);
    if (value) {
        self.closest('.form-group').removeClass('error').addClass('has-success')
    }
});

/**
 * [name 职位]
 * @type {String}
 */
$("[name='position']").blur(function() {
    var value = $.trim($(this).val());
    var self = $(this);
    if (value) {
        self.closest('.form-group').removeClass('error').addClass('has-success')
    }
});

/**
 * [name 手机号验证]
 * @type {String}
 */
$("[name='mobileno']").blur(function() {
    let value = $.trim($(this).val());
    let self = $(this);
    if (value) {
        if (!methods.isMobile(value)) {
            self.siblings('.help-block').text("手机号码格式不正确").show()
            self.closest('.form-group').addClass('has-error')
            return false;
        } else {
            self.siblings('.help-block').text("").hide()
            self.closest('.form-group').addClass('has-success')
        }
    }
});

/**
 * [name 公司名称]
 * @type {String}
 */
$("[name='company']").blur(function() {
    var self = $(this);
    if ($.trim($(this).val())) {
      self.siblings('.help-block').text("").hide()
      self.closest('.form-group').addClass('has-success')
    }
});

//提交
$("#reg-btn").on("click", function() {
    let email = $.trim($('input[name="email"]').val()), //手机号
        password = $.trim($('input[name="password"]').val()), //设置登录密码
        crmpassword = $.trim($('input[name="crmpassword"]').val()), //确认登录密码
        username = $.trim($('input[name="username"]').val()), //姓名
        company = $.trim($('input[name="company"]').val()), //公司
        position = $.trim($('input[name="position"]').val()), //职位
        mobileno = $.trim($('input[name="mobileno"]').val()); //手机号
    let msg = '';
    if (!email) {
        $('input[name="email"]').siblings('.help-block').text("请输入邮箱地址").show()
        $('input[name="email"]').closest('.form-group').addClass('has-error')
        return false;
    }
    if (!methods.isEmail(email)) {
        $('input[name="email"]').siblings('.help-block').text("邮箱格式不正确").show()
        $('input[name="email"]').closest('.form-group').addClass('has-error')
        return false;
    }
    if (stat == 0) {
        return false;
    }
    if (!password) {
        $('input[name="password"]').siblings('.help-block').text("请输入密码").show()
        $('input[name="password"]').closest('.form-group').addClass('has-error')
        return false;
    }
    if (!methods.isPwd(password)) {
        $('input[name="password"]').siblings('.help-block').text("密码只能由英文、数字及标点符号组成").show()
        $('input[name="password"]').closest('.form-group').addClass('has-error')
        return false;
    }

    if (!methods.betweenLength(password, 20, 6)) {
        $('input[name="password"]').siblings('.help-block').text("密码长度只能在6-20位字符之间").show()
        $('input[name="password"]').closest('.form-group').addClass('has-error')
        return false;
    }

    if (methods.simplePwd(password)) {
        $('input[name="password"]').siblings('.help-block').text("密码是6-20位字符，且字母、数字、标点符号至少包括两种").show()
        $('input[name="password"]').closest('.form-group').addClass('has-error')
        return false;
    }
    if (!crmpassword) {
        $('input[name="crmpassword"]').siblings('.help-block').text("请重复输入密码").show()
        $('input[name="crmpassword"]').closest('.form-group').addClass('has-error')
        return false;
    }
    if (password != crmpassword) {
        $('input[name="crmpassword"]').siblings('.help-block').text("两次密码输入不一致").show()
        $('input[name="crmpassword"]').closest('.form-group').addClass('has-error')
        return false;
    }
    if (!username) {
        $('input[name="username"]').siblings('.help-block').text("请输入姓名").show()
        $('input[name="username"]').closest('.form-group').addClass('has-error')
        return false;
    }
    if (!position) {
        $('input[name="position"]').siblings('.help-block').text("请输入职位").show()
        $('input[name="position"]').closest('.form-group').addClass('has-error')
        return false;
    }
    if (!mobileno) {
        $('input[name="mobileno"]').siblings('.help-block').text("请输入手机号码").show()
        $('input[name="mobileno"]').closest('.form-group').addClass('has-error')
        return false;
    }
    if (!methods.isMobile(mobileno)) {
        $('input[name="mobileno"]').siblings('.help-block').text("手机号码格式不正确").show()
        $('input[name="mobileno"]').closest('.form-group').addClass('has-error')
        return false;
    }
    if (!company) {
        $('input[name="company"]').siblings('.help-block').text("请输入公司名称").show()
        $('input[name="company"]').closest('.form-group').addClass('has-error')
        return false;
    }
    $.ajax({
        url: Base.domain + "/passport/regVali.html",
        type: "post",
        data: $("[data-form='reg']").serialize(),
        success: function(data) {
            if (data.status == 1) {
                window.location = Base.domain + "/passport/regEmail.html";
            } else {
                $tip.text(data.respmsg).show();
                return false;
            }
        },
        error: function() {
            $tip.text('网络错误，请稍后重试！').show();
            return false;
        }
    });
});
