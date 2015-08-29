#  [![Build Status](https://secure.travis-ci.org/ralucas/factory-create.png?branch=master)](http://travis-ci.org/ralucas/factory-create)

> Utility functions that can be used as a factory for instantiating objects


## Getting Started

Install the module with: `npm install factory-create`

```js
var factory = require('factory-create');
```

## Documentation
There are 4 methods:
* create -- This is basically a slight abstraction of the `Object.create` method in ES5:

```
var instance = factory.create(Class, {
  valueProp: { 
    writable: true,  
    configurable:true, 
    value: 'myValue' 
  },
  dataProp: {
    configurable:true, 
    get: function() { 
      return this.valueProp;
    },
    set: function(value) { 
      this.valueProp = 'newValue'; 
    }
  }
});
```

* createInstance -- Creates an instance from a relative file path

```
var instance = factory.createInstance('./classes/anotherClass.js', params); // returns instance with methods and properties
```

* createInstances -- Creates instances from a collection of file paths, returns an object of instances

```
var instances = factory.createInstances(instancesObj, params);
```

* createFromIndex -- Creates instances from an `index.js` file for the current directory

```
var instance = factory.createFromIndex('./myCurrDir', params);

or

var instance = factory.createFromIndex(); // Assumes creation of instances all located in same directory as index.js
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com).


## License

Copyright (c) 2015 Richard A. Lucas  
Licensed under the MIT license.
