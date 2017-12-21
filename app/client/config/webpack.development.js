'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const rootPath = path.resolve(__dirname, '../../..');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: path.join(rootPath, 'app/client/main.js'),
  output: {
    path: path.join(rootPath, '/dist/'),
    filename: '[name].js',
    publicPath: "../../../"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(rootPath, 'app/client/index.html'),
      inject: 'body',
      filename: 'index.html'
    }),
    new ExtractTextPlugin("[name].css"),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      Popper: ['popper.js', 'default']
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          "presets": ["react", "env", "stage-0", "react-hmre"],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
        }
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              publicPath: path.join(rootPath, '/public/')
            }
          }
        ]
      }]
  }
};