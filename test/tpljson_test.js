'use strict';
var grunt = require('grunt');

exports.tpljson = {
  dist: function(test){
    test.expect(2);

    var delivery_actual = grunt.file.read('test/dist/delivery.tpl.js');
    var delivery_expected = grunt.file.read('test/expected/delivery.tpl.js');

    var dian_actual = grunt.file.read('test/dist/dian.tpl.js');
    var dian_expected = grunt.file.read('test/expected/dian.tpl.js');

    //console.log(delivery)
    test.equal(delivery_actual, delivery_expected, 'should delivery tpljson');
    test.equal(dian_actual, dian_expected, 'should dian tpljson');

    test.done();
  }
};