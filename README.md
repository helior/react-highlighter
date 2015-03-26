[![npm version](https://badge.fury.io/js/react-highlighter.svg)](http://badge.fury.io/js/react-highlighter)

# react-highlighter
Highlight select fragments of a string using an HTML element and/or a class.

## Installation

```
npm install react-highlighter --save
```

## Usage
```
var Highlight = require('react-highlighter');

<Highlight search="brown">The quick brown fox jumps over the lazy dog</Highlight>
```
## Props
- `search`: The string of text to highlight
- `caseSensitive`: Determine whether string matching should be case-sensitive. Defaults to `false`
- `matchElement`: HTML tag name to wrap around highlighted text. Defaults to `strong`
- `matchClass`: HTML class to wrap around highlighted text. Defaults to `highlight`


## Development
### Testing
Using Mocha/Chai/React.addons.TestUtils for testing.
```
npm test
```
