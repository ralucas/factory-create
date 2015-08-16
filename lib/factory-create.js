/*
 * 
 * https://github.com/ralucas/factory-create
 *
 * Copyright (c) 2015 Richard A. Lucas
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function factory(klass) {
  return Object.create(klass);
};
