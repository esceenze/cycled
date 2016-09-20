/* eslint-disable */

var path = require('path');
var webpack = require('webpack');


module.exports = {
  devtool: 'cheap-module-source-map',
  entry: path.join(__dirname, 'src', 'index'),
  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'src'],
  },
  plugins: [
      new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
          compressor: {
              warnings: false
          }
      })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ['babel']
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.sass$/,
        loaders: ["style", "css", "sass-loader?indentedSyntax"]
      },
      {
        test: /\.(jpe?g|png|gif|svg|eot|ttf|otf|woff|woff2)$/i,
        loader: 'url?limit=8192'
      },
    ]
  }
};
