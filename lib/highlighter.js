var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var RegExpPropType = require('./regExpPropType');
var escapeStringRegexp = require('escape-string-regexp');
var blacklist = require('blacklist');

var Highlighter = createReactClass({displayName: "Highlighter",
  count: 0,

  propTypes: {
    search: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      RegExpPropType
    ]).isRequired,
    caseSensitive: PropTypes.bool,
    matchElement: PropTypes.string,
    matchClass: PropTypes.string,
    matchStyle: PropTypes.object
  },

  getDefaultProps: function() {
    return {
      caseSensitive: false,
      matchElement: 'strong',
      matchClass: 'highlight',
      matchStyle: {}
    }
  },

  render: function() {
    var props = blacklist(this.props, 'search', 'caseSensitive', 'matchElement', 'matchClass', 'matchStyle');

    return React.createElement('span', props, this.renderElement(this.props.children));
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
      var search = this.getSearch();
      return this.highlightChildren(subject, search);
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
   * Get the search prop, but always in the form of a regular expression. Use
   * this as a proxy to this.props.search for consistency.
   *
   * @return {RegExp}
   */
  getSearch: function() {
    if (this.props.search instanceof RegExp) {
      return this.props.search;
    }

    var flags = '';
    if (!this.props.caseSensitive) {
      flags +='i';
    }

    var search = this.props.search;
    if (typeof this.props.search === 'string') {
      search = escapeStringRegexp(search);
    }

    return new RegExp(search, flags);
  },

  /**
   * Get the indexes of the first and last characters of the matched string.
   *
   * @param  {string} subject
   *   The string to search against.
   *
   * @param  {RegExp} search
   *   The regex search query.
   *
   * @return {Object}
   *   An object consisting of "first" and "last" properties representing the
   *   indexes of the first and last characters of a matching string.
   */
  getMatchBoundaries: function(subject, search) {
    var matches = search.exec(subject);
    if (matches) {
      return {
        first: matches.index,
        last: matches.index + matches[0].length
      };
    }
  },

  /**
   * Determines which strings of text should be highlighted or not.
   *
   * @param  {string} subject
   *   The body of text that will be searched for highlighted words.
   * @param  {string} search
   *   The search used to search for highlighted words.
   *
   * @return {Array}
   *   An array of ReactElements
   */
  highlightChildren: function(subject, search) {
    var children = [];
    var matchElement = this.props.matchElement;
    var remaining = subject;

    while (remaining) {
      if (!search.test(remaining)) {
        children.push(this.renderPlain(remaining));
        return children;
      }

      var boundaries = this.getMatchBoundaries(remaining, search);

      // Capture the string that leads up to a match...
      var nonMatch = remaining.slice(0, boundaries.first);
      if (nonMatch) {
        children.push(this.renderPlain(nonMatch));
      }

      // Now, capture the matching string...
      var match = remaining.slice(boundaries.first, boundaries.last);
      if (match) {
        children.push(this.renderHighlight(match, matchElement));
      }

      // And if there's anything left over, recursively run this method again.
      remaining = remaining.slice(boundaries.last);

    }

    return children;
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
    return React.DOM[this.props.matchElement]({
      key: this.count,
      className: this.props.matchClass,
      style: this.props.matchStyle
    }, string);
  }
});

module.exports = Highlighter;
