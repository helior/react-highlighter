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
- `caseSensitive`: Determine whether string matching should be case-sensitive
