/*
 * grunt-tpljson
 * https://github.com/0hao/grunt-tpljson
 *
 * Copyright (c) 2014 lin
 * Licensed under the MIT license.
 */

'use strict';
var chalk = require('chalk');
var prettyBytes = require('pretty-bytes');
//var minify = require('html-minifier').minify;

module.exports = function (grunt) {
  // Internal lib.
  var comment = require('./lib/comment').init(grunt);
  
  grunt.registerMultiTask('tpljson', '.tpl 2 .js(json)', function () {
    var options = this.options();

    var files_map  = {};

    var name_reg = new RegExp('/(\\w+)\\' + options.srcExt);

    var srcExt_reg = new RegExp(options.srcExt+'$');

    //循环目录建立映射
    grunt.file.recurse(options.src, function callback(abspath, rootdir, subdir, filename) {

      if(subdir && srcExt_reg.test(filename)) {
        files_map[subdir] = files_map[subdir] || [];
        files_map[subdir].push(abspath);
      }
      
    });
    
    function buildFiles(key){
      var files = files_map[key];

      var multi_src = files.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        var src = grunt.file.read(filepath);
        // Process files as templates if requested.
        if (options.process) {
          src = grunt.template.process(src, options.process);
        }
        // Strip banners if requested.
        if (options.stripBanners) {
          src = comment.stripBanner(src, options.stripBanners);
        }

        var name_r = filepath.match(name_reg);


        if(name_r) {
          name_r = name_r[1];
        }

        //去除换行和空格
        src = src.split('\n');
        var t_src = [];
        src.forEach(function(item){
          t_src.push(item.trim());
        });

        src = "'" + name_r + "':" + "'" + t_src.join('') + "'";

        return src;
      }).join(options.separator);

      // var multi_min;
      // try {
      //   multi_min = minify(multi_src, options);
      // } catch (err) {
      //   return grunt.warn(key + '\n' + err);
      // }

      if (multi_src.length < 1) {
        grunt.log.warn('Destination not written because multi_src was empty.');
      } else {
        var destfile = options.dest + '/'+key + options.destExt,  
            srcfile = options.jsonp + '({' + multi_src + '})';
        grunt.file.write( destfile, srcfile);
        grunt.log.writeln('done ' + chalk.cyan(destfile) + ' ' + prettyBytes(srcfile.length));
      }
    }

    //loop dir
    for (var key in files_map) {
      buildFiles(key);
    }

  });
};
