'use strict';

var glob = require('glob');
var path = require('path');
var S = require('string');

module.exports = {
  create: function create() {
    if (this.init) {
      this.init();
    }
    return Object.create(this.methods);
  },

  methods: {

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

    createFromIndex: function createFromIndex(srcDir, params) {
      var output = {};
      var dir = path.join(__dirname, srcDir);
      glob.sync(dir).forEach(function(file) {
        var fileName = S(path.basename(file, '.js')).camelize().s;
        if (!/index/.test(file)) {
          var instance = this.createInstance(file, params); 
          output[fileName] = instance;
        }
      });
      return output;
    }
  }


};
