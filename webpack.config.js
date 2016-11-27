/*eslint-disable */
const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://0.0.0.0:3001',
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'src', 'index'),
  ],
  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'src']
  },
  historyApiFallback: true,
  plugins: [
      new webpack.DefinePlugin({
          'process.env': {
              'PATH_API': JSON.stringify('http://79.136.169.62:7000/api/'),
              'NODE_ENV': JSON.stringify('development')
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
        test: /\.(jpe?g|png|gif|svg|eot|ttf|otf|woff|woff2)$/i,
        loader: 'url?limit=8192'
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
        test: /\.css$/,
        loaders: ["style", "css"]
      }
    ]
  },
};
