var webpack = require('webpack');
var pkg = require('./package.json');

module.exports = [
  {
    entry: './lib/highlighter.js',
    output: {
      path: './dist',
      pathinfo: true,
      sourcePrefix: '',
      filename: 'ReactHighlighter-v' + pkg.version + '.js',
      library: 'ReactHighlighter',
      libraryTarget: "umd"
    },
    externals: {
      'react': 'React'
    }
  },
  {
    entry: './lib/highlighter.js',
    output: {
      path: './dist',
      filename: 'ReactHighlighter-v' + pkg.version + '.min.js',
      library: 'ReactHighlighter',
      libraryTarget: "umd"
    },
    plugins:[
      new webpack.optimize.UglifyJsPlugin()
    ],
    externals: {
      'react': 'React'
    }
  }
];
