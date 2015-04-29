var regExpPropType = require('../lib/regExpPropType');
var expect = require('chai').expect;

describe('RegExp PropType', function() {
  var propName = 'myProp';
  var props = {};
  var componentName = 'component';
  var location = 'variable';

  it('should return nothing', function() {
    props[propName] = new RegExp();
    expect(regExpPropType(props, propName, componentName, location)).to.be.undefined;
  });

  it('should throw an Error', function() {

    props[propName] = '';
    expect(regExpPropType(props, propName, componentName, location)).to.be.an.instanceOf(Error);
  });
});
