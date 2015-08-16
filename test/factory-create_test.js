/*global describe,it*/
'use strict';
var assert = require('assert'),
  factoryCreate = require('../lib/factory-create.js');

describe('factory-create node module.', function() {
  it('must be awesome', function() {
    assert( factoryCreate.awesome(), 'awesome');
  });
});
