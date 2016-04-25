var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

var options = {
  cache: true,
  target: 'atom',
  devtool: 'source-map',
  entry: {
    app: ['webpack/hot/dev-server', './src/pages/index/index.jsx']
  },
  output: {
    path: './public/build',
    filename: 'bundle.js',
    publicPath: 'http://127.0.0.1:8080/build/'
  },
  devServer: {
    contentBase: './public',
    publicPath: 'http://127.0.0.1:8080/build/'
  },
  module: {
    loaders: [{
        test: /\.less$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'less-loader')
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }, {
        test: /\.(png|jpe?g|eot|svg|ttf|woff2?)$/,
        loader: 'file'
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'stage-1', 'react']
        }
      }, {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
    alias: {
      'mode-markdown': 'react-codemirror/node_modules/codemirror/mode/markdown/markdown',
      'mode-markdown-styles': 'react-codemirror/node_modules/codemirror/lib/codemirror.css'
    }
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/pages/index/index.dev.html'
    }),
    new webpack.ProvidePlugin({
      'React': 'react',
      'ReactDOM': 'react-dom'
    })
  ]
}

// options.target = webpackTargetElectronRenderer(options);

module.exports = options;