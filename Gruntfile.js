/*
 * grunt-test
 * https://github.com/0hao/grunt-tpljson
 *
 * Copyright (c) 2014 lin
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ]
    },
    clean: {
      test: ['test/dest']
    },
    tpljson: { // Task
      dist: { // Target
        options: { // Target options
          src: 'test/src',
          srcExt: '.tpl',
          dest: 'test/dist', //导出
          destExt: '.tpl.js', //生成的后缀名
          separator: ',', //合并文件的分割符
          // banner: '',
          // footer: '',
          //stripBanners: {block:true,line:true}, //注释
          //process: false, //引入
          jsonp: 'jstpl' //
        }
      }
    },
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  //grunt.loadNpmTasks('grunt-contrib-internal'); build-contrib

  grunt.registerTask('test', ['clean', 'tpljson', 'nodeunit']);
  //grunt.registerTask('default', ['jshint', 'test']);
};