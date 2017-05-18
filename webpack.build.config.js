'use strict';

const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));

module.exports = webpackConfig;
