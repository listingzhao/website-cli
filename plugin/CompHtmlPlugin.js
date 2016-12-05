'use strict';

const path = require('path');
const fs = require('fs');
const gcf = require('./gcf');
function CompHtmlPlugin(options) {}

var compArray = {};
CompHtmlPlugin.prototype.apply = function(compiler) {

  compiler.plugin("emit", function(compilation, callback) {
    var changed = gcf.get('./src/views',function(item){
        if(item.match(/^node_modules|^\./)) return false;
        return true;
    });
    var newArray = changed.map((item) => {
      var rObj = item.replace('src','..');
      return rObj;
    })
    for (let arr of newArray) {
      compArray = {};
      compArray[arr] = arr;
    }
    for (var filename in compilation.assets) {
      if(filename.endsWith('.html') && compArray.hasOwnProperty(filename)){
        // console.log('filename:' + filename);
        let filepath = path.resolve('views/', filename)
        // console.log('filepath:' + filepath);
        let dirname = path.dirname(filepath);
        // console.log('dirname:' + dirname);
        if (!fs.existsSync(dirname)) {
          mkdir('-p', dirname)
        }
        fs.writeFile(filepath, compilation.assets[filename].source())
      }
    }
    callback();
  });
};

module.exports = CompHtmlPlugin;
