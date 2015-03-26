var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var expect = require('chai').expect;
var Highlight = require('..');

global.document = require('jsdom').jsdom();
global.window = global.document.defaultView;

describe('Highlight element', function() {
  it('is what it says it is', function() {
    var element = React.createElement(Highlight, {search: 'world'}, 'Hello World');
    var node = TestUtils.renderIntoDocument(element);
    var matches = TestUtils.scryRenderedDOMComponentsWithTag(node, 'strong');

    expect(TestUtils.isElement(element)).to.be.true;
    expect(TestUtils.isElementOfType(element, Highlight)).to.be.true;
    expect(matches[0].getDOMNode().textContent).to.equal('World');
  });

  it('should have children', function() {
    var element = React.createElement(Highlight, {search: 'fox'}, 'The quick brown fox jumped over the lazy dog.');
    var node = TestUtils.renderIntoDocument(element);
    var matches = TestUtils.scryRenderedDOMComponentsWithClass(node, 'highlight');

    expect(node.getDOMNode().children.length).to.equal(3);
    expect(matches).to.have.length(1);

  });

  it('has classes', function() {
    var element = React.createElement(Highlight, {search: 'world', className: 'myHighlighter'}, 'Hello World');
    var node = TestUtils.renderIntoDocument(element);
    var matches = TestUtils.scryRenderedDOMComponentsWithTag(node, 'strong');

    expect(node.getDOMNode().className).to.equal('myHighlighter');
    expect(matches[0].getDOMNode().className).to.equal('highlight')
  });
});
