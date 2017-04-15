'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const postcssLoader = {
    loader: 'postcss-loader',
    options: {
        plugins: () => [
            require('cssnano'),
            require('autoprefixer')
        ]
    }
};

module.exports = {
    context: path.join(__dirname, 'views', 'pages'),

    entry: {
        main: './main/pack.js',
        quest: './quest/pack.js',
        createQuest: './createQuest/pack.js'
    },

    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', postcssLoader, 'stylus-loader']
                })
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin({
            filename: '[name].bundle.css'
        })
    ]
};
