var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: ['./src/pages/index/index.js']
  },
  output: {
    path: './build/index/',
    publicPath: './',
    filename: '/[name].js',
    chunkFilename: "/[id].js"
  },
  module: {
    loaders: [{
        test: /\.less$/,
        exclude: /node_modules/,
        loader: 'style!css!less'
      }, {
        test: /\.css$/,
        loader: 'style!css'
      }, {
        test: /\.(png|jpe?g|eot|svg|ttf|woff2?)$/,
        loader: 'file'
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }, {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/pages/index/index.html'
    })
  ]
};