'use strict';

var glob = require('glob');
var path = require('path');
var camelCase = require('camel-case');
var callsites = require('callsites');

module.exports = {
  create: function create(Klass, props) {
    if (this.init) {
      this.init();
    }
    return Object.create(Klass['prototype'], props);
  },

  createInstances: function createInstances(prop, params) {
    var output = {};

    if (typeof this[prop] === 'function') {
      var klass = this[prop];
      return this.createInstance(klass, params);
    }

    for (var key in this[prop]) {
      var Klass = require(this[prop][key]);
      output[key] = new Klass(params);
    }
    return output;
  },

  createInstance: function createInstance(klass, params) {
    var Klass = require(klass);
    return new Klass(params);
  },

  createFromIndex: function createFromIndex(options) {
    var _this = this;

    var output = {};
    var srcFile = callsites()[1].getFileName(); 
    var dir = path.join(srcFile, '..') + '/*.js';

    glob.sync(dir).forEach(function(file) {
      var fileName = '';
      var params = options && options.params;
      if (options && options.firstSplit) {
        fileName = path.basename(file, '.js').split(/\.|\-|\_/g)[0];
      } else {
        fileName = camelCase(path.basename(file, '.js'));
      }
      if (!/index/.test(file)) {
        var instance = _this.createInstance(file, params); 
        output[fileName] = instance;
      }
    });
    return output;
  }

};
