const path = require("path");
const Webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin=require("extract-text-webpack-plugin");


module.exports = {   
    entry:'./src/index.js',
    devtool:"cheap-module-eval-source-map", 
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'./dist')
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
               }
        },
          ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), 
        host: '192.168.1.52',
        port: 8090,
        open: true,
        hot: true
      },
    plugins:[
        require('autoprefixer'),
        new HtmlWebpackPlugin({ title: 'App', template: './src/index.html' }),
    ],
    mode: 'development'
  };