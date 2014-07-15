/*
 * grunt-tpljson
 * http://gruntjs.com/
 *
 * Copyright (c) 2014 Sindre Sorhus, contributors
 * Licensed under the MIT license.
 */

'use strict';
var chalk = require('chalk');
var prettyBytes = require('pretty-bytes');
var minify = require('html-minifier').minify;

module.exports = function (grunt) {
  grunt.registerMultiTask('tpljson', '.tpl 2 .js(json)', function () {
    var options = this.options();

    var files_map  = {};
    grunt.file.recurse(options.src, function callback(abspath, rootdir, subdir, filename) {
      if(subdir && /.tpl$/.test(filename)) {
        files_map[subdir] = files_map[subdir] || [];
        var arr = new Array(abspath)
        files_map[subdir].push(abspath);
      }
      
    })

    //loop dir
    for (var key in files_map) {
      minFiles(key);
    };

    function minFiles(key){

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

        return src;
      }).join(options.separator);

      var multi_min;
      try {
        multi_min = minify(multi_src, options);
      } catch (err) {
        return grunt.warn(key + '\n' + err);
      }

      if (multi_min.length < 1) {
        grunt.log.warn('Destination not written because multi_min was empty.');
      } else {
        var destfile = options.dest + '/'+key + options.ext;
        grunt.file.write( destfile, options.jsonp + '({' + multi_min + '})' );
        grunt.log.writeln('done ' + chalk.cyan(destfile) + ' ' + prettyBytes(multi_min.length));
      }
    }

  });
};
