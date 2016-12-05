'use strict';

console.info('require retr-valid-email index.');

require('../less/login.less');
require('../less/register.less');

let $ = require('jquery'),
    validate = require("./utils/validate"),
    methods = validate.methods;

const $tip = $(".toast-form-err");

const errorMsg = '${errormsg}';

if(errorMsg) {
  $tip.show();
}

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

var count = 60,
    timer = null;
let $btn = $('#btn-send');
var email = $.trim($("[name='email']").val());
function loop() {
    if (count > 0) {
        count--;
        $btn.html("重新发送邮件(" + count + ")").addClass('disabled').removeClass('cta');
        timer = setTimeout(function() {
            loop();
        }, 1000);
    } else {
        clearTimeout(timer);
        $btn.addClass('cta').removeClass('disabled').html('重新发送邮件');
    }
}
loop();

/**
 * 重新发送邮件
 */
$btn.on('click', function() {
    if ($(this).hasClass('disabled')) {
        return;
    }
    $.ajax({
        url: Base.domain + '/passport/sendResetPwdEmail.html',
        type: "post",
        async: false,
        data: {
            email: email
        },
        success: function(data) {
            if (data.status == 'success') {
                $btn.addClass("disabled");
                loop();
            } else {
                $tip.text(data.respmsg).show();
            }
        },
        error: function() {
            $tip.text("网络错误！").show();
        }
    });
});
