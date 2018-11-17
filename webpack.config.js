const path = require("path");
const Webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var proxy = require('http-proxy-middleware');
const context = [`/k3cloud/*`];

module.exports = {
  entry: './src/index.js',
  devtool: "cheap-module-eval-source-map",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader',
      },
      {
        test: /\.css$/, loader: 'style-loader!css-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
        include: path.resolve(__dirname, 'src'),
        query: {
          presets: ['es2015', 'react', 'stage-0']
        },
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf|ico)$/, loader: 'url-loader?limit=8192&name=./img/[name].[ext]'
      },
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '192.168.1.52',
    port: 8090,
    open: true,
    hot: true,
    proxy: [
      {
        context: context,
        target: 'http://canda.f3322.net:8003',
        secure: false,
        changeOrigin: true
        //pathRewrite: {'^/api': '/api/Login'},
      }
    ]
  },
  plugins: [
    require('autoprefixer'),
    new HtmlWebpackPlugin({ title: 'App', template: './src/index.html' }),
  ],
  mode: 'development',
  performance: {
    hints: "warning",
    maxAssetSize: 30000000,
    maxEntrypointSize: 50000000,
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  }
};