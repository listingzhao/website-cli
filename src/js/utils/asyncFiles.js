'use strict'

// const path = require('path')
//
// const srcDir = path.resolve(process.cwd(), 'src')
//
// console.log(srcDir);

var assetMap = require('json!../../../assets.json?v=2');
console.log(assetMap);
// var fileContent = fs.readFileSync(assetMap);
// var assetsJson = JSON.parse(fileContent);
var assetsJson = assetMap;
function getStaticMap(suffix) {
    var map = {};
    for (var item in assetsJson) {
        map[item] = assetsJson[item][suffix];
    }
    return map;
}
var mapList = getStaticMap('js');

var cssList = getStaticMap('css');

var jsfiles = ['vender','index']

var cssfiles = ['common','index']

function asyncLoadJs(files) {
    //加载package.js文件，设置script的id为yy
    // loadJs("yy", "package.js", callbackFunction);

    for (var i = 0; i < files.length; i++) {
      let js_url = mapList[files[i]];
      loadJs('js_'+ i,Base.asyncFiles.root + js_url);
    }
}
function asyncLoadCss(files) {
  for (var i = 0; i < files.length; i++) {
    let css_url = cssList[files[i]];
    loadCss('css_'+i, Base.asyncFiles.root + css_url);
  }
}

function syncLoadCss(files) {
  for (var i = 0; i < files.length; i++) {
    let css_url = cssList[files[i]];
    loadCssSync('css_'+i, Base.asyncFiles.root + css_url);
  }
}
// asyncLoadJs(jsfiles)
//
// asyncLoadCss(cssfiles)

function callbackFunction() {
    functionOne();
}

function functionOne(){
  alert("成功加载");
}

function loadJs(sid, jsurl, callback) {
    var nodeHead = document.getElementsByTagName('head')[0];
    var body = document.body;
    var nodeScript = null;
    if (document.getElementById(sid) == null) {
        nodeScript = document.createElement('script');
        nodeScript.setAttribute('type', 'text/javascript');
        nodeScript.setAttribute('src', jsurl);
        nodeScript.setAttribute('id', sid);
        if (callback != null) {
            nodeScript.onload = nodeScript.onreadystatechange = function() {
                if (nodeScript.ready) {
                    return false;
                }
                if (!nodeScript.readyState || nodeScript.readyState == "loaded" || nodeScript.readyState == 'complete') {
                    nodeScript.ready = true;
                    callback();
                }
            };
        }
        body.appendChild(nodeScript);
    } else {
        if (callback != null) {
            callback();
        }
    }
}

function loadCss(sid, jsurl, callback) {
    var nodeHead = document.getElementsByTagName('head')[0];
    var nodeStyle = null;
    if (document.getElementById(sid) == null) {
        nodeStyle = document.createElement('link');
        nodeStyle.setAttribute('rel', 'stylesheet');
        nodeStyle.setAttribute('href', jsurl);
        nodeStyle.setAttribute('id', sid);
        if (callback != null) {
            nodeStyle.onload = nodeStyle.onreadystatechange = function() {
                if (nodeStyle.ready) {
                    return false;
                }
                if (!nodeStyle.readyState || nodeStyle.readyState == "loaded" || nodeStyle.readyState == 'complete') {
                    nodeStyle.ready = true;
                    callback();
                }
            };
        }
        nodeHead.appendChild(nodeStyle);
    } else {
        if (callback != null) {
            callback();
        }
    }
}

/**
 * 同步加载js脚本
 * @param id  需要设置的<script>标签的id
 * @param url  js文件的相对路径或绝对路径
 * @return {Boolean}  返回是否加载成功，true代表成功，false代表失败
 */
function syncloadJS(id, url) {
    var xmlHttp = null;
    if (window.ActiveXObject) { //IE
        try
        {
            //IE6以及以后版本中可以使用
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            //IE5.5以及以后版本可以使用
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    } else if (window.XMLHttpRequest) { //Firefox，Opera 8.0+，Safari，Chrome
        xmlHttp = new XMLHttpRequest();
    }
    //采用同步加载
    xmlHttp.open("GET", url, false);
    //发送同步请求，如果浏览器为Chrome或Opera，必须发布后才能运行，不然会报错
    xmlHttp.send(null);
    //4代表数据发送完毕
    if (xmlHttp.readyState == 4) {
        //0为访问的本地，200到300代表访问服务器成功，304代表没做修改访问的是缓存
        if ((xmlHttp.status >= 200 && xmlHttp.status < 300) || xmlHttp.status == 0 || xmlHttp.status == 304) {
            var myHead = document.getElementsByTagName("HEAD").item(0);
            var myScript = document.createElement("script");
            myScript.language = "javascript";
            myScript.type = "text/javascript";
            myScript.id = id;
            try {
                //IE8以及以下不支持这种方式，需要通过text属性来设置 myScript.
                appendChild(document.createTextNode(xmlHttp.responseText));
            } catch (ex) {
                myScript.text = xmlHttp.responseText;
            }
            myHead.appendChild(myScript);
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

/**
 * 同步加载js脚本
 * @param id  需要设置的<script>标签的id
 * @param url  js文件的相对路径或绝对路径
 * @return {Boolean}  返回是否加载成功，true代表成功，false代表失败
 */
function loadCssSync(id, url) {
    var xmlHttp = null;
    if (window.ActiveXObject) { //IE
        try
        {
            //IE6以及以后版本中可以使用
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            //IE5.5以及以后版本可以使用
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    } else if (window.XMLHttpRequest) { //Firefox，Opera 8.0+，Safari，Chrome
        xmlHttp = new XMLHttpRequest();
    }
    //采用同步加载
    xmlHttp.open("GET", url, false);
    //发送同步请求，如果浏览器为Chrome或Opera，必须发布后才能运行，不然会报错
    xmlHttp.send(null);
    //4代表数据发送完毕
    if (xmlHttp.readyState == 4) {
        //0为访问的本地，200到300代表访问服务器成功，304代表没做修改访问的是缓存
        if ((xmlHttp.status >= 200 && xmlHttp.status < 300) || xmlHttp.status == 0 || xmlHttp.status == 304) {
            var myHead = document.getElementsByTagName("HEAD").item(0);
            var nodeStyle = document.createElement("link");
            nodeStyle.setAttribute('rel', 'stylesheet');
            nodeStyle.setAttribute('href', url);
            nodeStyle.setAttribute('id', id);
            try {
                //IE8以及以下不支持这种方式，需要通过text属性来设置 nodeStyle.
                appendChild(document.createTextNode(xmlHttp.responseText));
            } catch (ex) {
                nodeStyle.text = xmlHttp.responseText;
            }
            myHead.appendChild(nodeStyle);
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}



exports.jsMapList = mapList;
exports.cssMapList = cssList;
exports.asyncLoadJs = asyncLoadJs;
exports.asyncLoadCss = asyncLoadCss;
exports.syncLoadCss = syncLoadCss;
