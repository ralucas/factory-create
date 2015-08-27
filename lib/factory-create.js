/*
 * 
 * https://github.com/ralucas/factory-create
 *
 * Copyright (c) 2015 Richard A. Lucas
 * Licensed under the MIT license.
 */

'use strict';

var glob = require('glob');
var path = require('path');

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

    createFromDirectory: function createFromDirectory(dir, params) {
      var output = {};
      glob.sync(dir).forEach(function(file) {
        var fileName = path.basename(file, '.js');
        if (!/index/.test(file)) {
          var instance = this.createInstance(file, params); 
          output[fileName] = instance;
        }
      });
      return output;
    }
  }


};
