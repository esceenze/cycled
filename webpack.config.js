/*eslint-disable */

const path = require('path');
const webpack = require('webpack');
// const autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3001', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
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
              'PATH_API': JSON.stringify('http://rti-gradebook.dev.architech.nyc:3010/api/')
          }
      })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.(jpe?g|png|gif|svg|eot|ttf|otf|woff|woff2)$/i,
        loader: 'url?limit=8192'
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
        // loaders: ["style", "css", "sass", "postcss-loader"]
      },
      {
        test: /\.sass$/,
        loaders: ["style", "css", "sass-loader?indentedSyntax"]
        // loaders: ["style", "css", "sass", "postcss-loader"]
      },
      {
        test: /\.css$/,
        loaders: ["style", "css"]
        // loaders: ["style", "css", "postcss-loader"]
      }
    ]
  },
  // postcss: [autoprefixer({browsers: ['last 2 versions']})]
};
