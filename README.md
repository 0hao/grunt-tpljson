# grunt-tpljson v0.2.0

> Concat files from tpl(HTML) to json(Minify HTML)



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-tpljson --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-tpljson');
```


## tpljson task
将tpl的html模板文件，转换为json格式，并根据目录合并压缩成新文件

#### Example config

```javascript
grunt.initConfig({
  tpljson: {
    dist: {
      options: {
        src: 'src',
        srcExt: '.tpl',
        dest: 'dist',
        ext: '.tpl.js',
        separator: ',',
        jsonp: 'jstpl'
      }
    }
  }
});

grunt.registerTask('default', ['tpljson']);
```

## Options

| Option                         | Description     | Default |
|--------------------------------|-----------------|---------|
| `src` | 源目录 | - |
| `srcExt` | 目录下匹配文件的后缀 | `.tpl` |
| `dest` | 合并导出目录 |  |
| `ext` | 合并导出文件后缀 | `.tpl.js` |
| `separator` | 合并文件的分割符号 | `,` |
| `jsonp` | jsonp的callback命名 | `jstpl` |


## Release History


 * 2013-01-09   v0.2.0
 * 2012-11-01   v0.1.0   
