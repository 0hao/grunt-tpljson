# grunt-tpljson v0.2.1

> Concat files from tpl(HTML) to json(Minify HTML)



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-tpljson
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-tpljson');
```


## 说明
* 循环`options.src`下的文件目录，查找.tpl文件，生成json格式，合并压缩
* 单个tpl转换生成的json的key为其文件名，合并后`.tpl.js`的文件名为目录名，所以不允许`.tpl`文件直接暴露在`options.src`目录下
* tpl文件内不允许出现`'`单引号，只能是双引号`"`，包括模板引擎内的逻辑

#### Example config

```javascript
grunt.initConfig({
  tpljson: {
    dist: {
      options: {
        src: 'test/src',
        srcExt: '.tpl',
        dest: 'test/dist',
        destExt: '.tpl.js',
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
| `dest` | 合并导出目录 | - |
| `destExt` | 合并导出文件后缀 | `.tpl.js` |
| `separator` | 合并文件的分割符号 | `,` |
| `jsonp` | jsonp的callback命名 | `jstpl` |


## 测试

#### src源目录

```
test/src
├── delivery
│   ├── delivery.tpl
│   └── address.tpl
│   
└── dian
    └── dian.tpl
    └── dian_list.tpl
```

* address.tpl

```
<div class="address_wrap">
    文一西路

        </div>
```

* delivery.tpl

```

<div class="delivery">
    <div class="<%=sort_id=="0"?:"current":""%>">1</div>
</div>

```

* dian.tpl

```

        <div class="dian">
    dian here
        </div>

```

* dian_list.tpl

```
        <div class="dian_list">/*注释*/
        </div>

```



#### build后生成

```
test/dist
├── delivery.tpl.js
└── dian.tpl.js
```

* delivery.tpl.js

```javascript
jstpl({'address':'<div class="address_wrap">文一西路</div>','delivery':'<div class="delivery"><div class="<%=sort_id=="0"?:"current":""%>">1</div></div>'})
```

* dian.tpl.js

```javascript
jstpl({'dian':'<div class="dian">dian here</div>','dian_list':'<div class="dian_list">/*注释*/</div>'})
```


## Release History

 * 2014-7-18   v0.2.1 补充测试用例，文档更新
 * 2014-7-16   v0.2.0 Initial release.
 * 2014-7-15   v0.1.0 demo
