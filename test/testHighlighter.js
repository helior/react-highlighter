var React = require('react');
var TestUtils = require('react-dom/test-utils');
var ReactDOM = require('react-dom');
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
    expect(ReactDOM.findDOMNode(matches[0]).textContent).to.equal('World');
  });

  it('should have children', function() {
    var element = React.createElement(Highlight, {search: 'fox'}, 'The quick brown fox jumped over the lazy dog.');
    var node = TestUtils.renderIntoDocument(element);
    var matches = TestUtils.scryRenderedDOMComponentsWithClass(node, 'highlight');

    expect(ReactDOM.findDOMNode(node).children.length).to.equal(3);
    expect(matches).to.have.length(1);

  });

  it('should allow empty search', function() {
    var element = React.createElement(Highlight, {search: ''}, 'The quick brown fox jumped over the lazy dog.');
    var node = TestUtils.renderIntoDocument(element);
    var matches = TestUtils.scryRenderedDOMComponentsWithClass(node, 'highlight');

    expect(ReactDOM.findDOMNode(node).children.length).to.equal(0);
    expect(matches).to.have.length(0);

  });


  it('should support custom HTML tag for matching elements', function() {
    var element = React.createElement(Highlight, {search: 'world', matchElement: 'em'}, 'Hello World');
    var node = TestUtils.renderIntoDocument(element);
    var matches = TestUtils.scryRenderedDOMComponentsWithTag(node, 'em');
    expect(matches).to.have.length(1);
  });

  it('should support custom className for matching element', function() {
    var element = React.createElement(Highlight, {search: 'Seek', matchClass: 'fffffound'}, 'Hide and Seek');
    var node = TestUtils.renderIntoDocument(element);
    var matches = TestUtils.scryRenderedDOMComponentsWithClass(node, 'fffffound');
    expect(matches).to.have.length(1);
  });

  it('should support custom style for matching element', function() {
    var element = React.createElement(Highlight, {search: 'Seek', matchStyle: { color: 'red' }}, 'Hide and Seek');
    var node = TestUtils.renderIntoDocument(element);
    var matches = TestUtils.scryRenderedDOMComponentsWithTag(node, 'strong');
    expect(matches[0].getAttribute('style')).to.eql('color: red;');
  });

  it('should support passing props to parent element', function() {
    var element = React.createElement(Highlight, {search: 'world', className: 'myHighlighter'}, 'Hello World');
    var node = TestUtils.renderIntoDocument(element);
    var matches = TestUtils.scryRenderedDOMComponentsWithTag(node, 'strong');

    expect(ReactDOM.findDOMNode(node).className).to.equal('myHighlighter');
    expect(ReactDOM.findDOMNode(matches[0]).className).to.equal('highlight')
  });

  it('should support regular expressions in search', function() {
    var element = React.createElement(Highlight, {search: /[A-Za-z]+/}, 'Easy as 123, ABC...');
    var node = TestUtils.renderIntoDocument(element);
    var matches = TestUtils.scryRenderedDOMComponentsWithTag(node, 'strong');
    expect(ReactDOM.findDOMNode(matches[0]).textContent).to.equal('Easy');
    expect(ReactDOM.findDOMNode(matches[1]).textContent).to.equal('as');
    expect(ReactDOM.findDOMNode(matches[2]).textContent).to.equal('ABC');
  });

  it('should support escaping arbitrary string in search', function() {
    var element = React.createElement(Highlight, {search: 'Test ('}, 'Test (should not throw)');
    expect(TestUtils.renderIntoDocument.bind(TestUtils, element)).to.not.throw(Error);
  });

  it('should not throw on long strings', function() {
    var longString = 'The quick brown fox jumped over the lazy dog. ';
    for (var i = 0; i < 4; i++) {
      longString += longString;
    }
    var element = React.createElement(Highlight, {search: /([A-Za-z])+/}, longString);
    expect(TestUtils.renderIntoDocument.bind(TestUtils, element)).not.to.throw(Error);

  });
});
