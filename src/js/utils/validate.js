'use strict'

//正则
var regexp = {
    email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$",
    idcard: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/,
    password: "^.*[A-Za-z0-9\\w_-]+.*$",
    mobile: "^0?(13|15|18|17|14)[0-9]{9}$",
    phone: '/^1((3[0-9])|(4[57])|([58][012356789]))\d{8}$/g',
    chinese: "^[\\u4e00-\\u9fa5]+$",
    realname: "^[A-Za-z\\u4e00-\\u9fa5]+$",
    username: "^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+$",
    intege: "^-?[0-9]\\d*$",
    bankno: "/^[0-9]{16,19}$/"
}

//简单方法
var methods = {
    isIdCard: function(str) {
        var temp = str.toUpperCase();
        return regexp.idcard.test(temp);
    },
    isRealName: function(str) {
        return new RegExp(regexp.realname).test(str);
    },
    isChinese: function(str) {
        return new RegExp(regexp.chinese).test(str);
    },
    isUID: function(str) {
        return new RegExp(regexp.username).test(str);
    },
    isPwd: function(str) {
        return new RegExp(regexp.password).test(str);
    },
    simplePwd: function(str) {
        return this.pwdLevel(str) == 1;
    },
    repeatPwd: function(str1, str2) {
        return str1 === str2;
    },
    isMobile: function(str) {
        return new RegExp(regexp.mobile).test(str);
    },
    isEmail: function(str) {
        return new RegExp(regexp.email).test(str);
    },
    isIntege: function(str) {
        return new RegExp(regexp.intege).test(str);
    },
    pwdLevel: function(value) {
        var pattern_1 = /^.*([\W_])+.*$/i,
            pattern_2 = /^.*([a-zA-Z])+.*$/i,
            pattern_3 = /^.*([0-9])+.*$/i,
            level = 0;

        if (pattern_1.test(value)) {
            level++;
        }
        if (pattern_2.test(value)) {
            level++;
        }
        if (pattern_3.test(value)) {
            level++;
        }
        if (level > 3) {
            level = 3;
        }
        return level;
    },
    isEmpty: function(str) {
        return (str === "" || typeof str !== "string");
    },
    betweenLength: function(str, max, min) {
        return (str.length >= min && str.length <= max);
    }
};

//对外开放的方法
var addons = {}

//对外开放
exports.regexp = regexp;
exports.methods = methods;
exports.addons = addons;
