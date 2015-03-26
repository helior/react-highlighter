var React = require('react');

var Highlighter = React.createClass({displayName: "Highlighter",
  count: 0,

  propTypes: {
    search: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.bool
    ]).isRequired,
    caseSensitive: React.PropTypes.bool,
    matchElement: React.PropTypes.string,
    matchClass: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      caseSensitive: false,
      matchElement: 'strong',
      matchClass: 'highlight'
    }
  },

  render: function() {
    return React.DOM.span(React.__spread({}, this.props), this.renderElement(this.props.children));
  },

  /**
   * A wrapper to the highlight method to determine when the highlighting
   * process should occur.
   *
   * @param  {string} subject
   *   The body of text that will be searched for highlighted words.
   *
   * @return {Array}
   *   An array of ReactElements
   */
  renderElement: function(subject) {
    if (this.isScalar() && this.hasSearch()) {
      return this.highlightChildren(subject);
    }

    return this.props.children;
  },

  /**
   * Determine if props are valid types for processing.
   *
   * @return {Boolean}
   */
  isScalar: function() {
    return (/string|number|boolean/).test(typeof this.props.children);
  },

  /**
   * Determine if required search prop is defined and valid.
   *
   * @return {Boolean}
   */
  hasSearch: function() {
    return (typeof this.props.search !== 'undefined') && this.props.search;
  },

  /**
   * Determines which strings of text should be highlighted or not.
   *
   * @param  {string} subject
   *   The body of text that will be searched for highlighted words.
   *
   * @return {Array}
   *   An array of ReactElements
   */
  highlightChildren: function(subject) {
    var children = [];

    if (this.searchIndex(subject) === -1) {
      children.push(this.renderPlain(subject));
      return children;
    }

    var firstSplit = this.searchIndex(subject);
    var secondSplit = firstSplit + this.props.search.length;

    var nonMatch = subject.slice(0, firstSplit);
    if (nonMatch) {
      children.push(this.renderPlain(nonMatch));
    }

    var match = subject.slice(firstSplit, secondSplit);
    if (match) {
      children.push(this.renderHighlight(match));
    }

    var remaining = subject.slice(secondSplit);
    if (remaining) {
      children = Array.prototype.concat(children, this.highlightChildren(remaining));
    }

    return children;
  },

  /**
   * Find the first index of a match.
   *
   * @return {string} subject
   *   The string of text to search against.
   *
   * @return {Number}
   */
  searchIndex: function(subject) {
    if (typeof subject !== 'string') return -1;

    if (this.props.caseSensitive) {
      return subject.indexOf(this.props.search);
    }
    else {
      return subject.toLowerCase().indexOf(this.props.search.toLowerCase());
    }
  },

  /**
   * Responsible for rending a non-highlighted element.
   *
   * @param  {string} string
   *   A string value to wrap an element around.
   *
   * @return {ReactElement}
   */
  renderPlain: function(string) {
    this.count++;
    return React.DOM.span({'key': this.count}, string);
  },

  /**
   * Responsible for rending a highlighted element.
   *
   * @param  {string} string
   *   A string value to wrap an element around.
   *
   * @return {ReactElement}
   */
  renderHighlight: function(string) {
    this.count++;
    return React.DOM[this.props.matchElement]({'key': this.count, 'className': this.props.matchClass}, string);
  }
});

module.exports = Highlighter;
