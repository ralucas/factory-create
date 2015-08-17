/*
 * 
 * https://github.com/ralucas/factory-create
 *
 * Copyright (c) 2015 Richard A. Lucas
 * Licensed under the MIT license.
 */

'use strict';

module.exports = {
  create: function crete(klass) {
    return Object.create(klass);
  },
  createInstance: function createInstance(Klass, params) {
    return new Klass(params);
  }
};
