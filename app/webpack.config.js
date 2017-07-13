"use strict";

const debug = process.env.NODE_ENV !== "production";

const webpack = require('webpack');
const path = require('path');

module.exports = {
    devtool: debug ? 'inline-sourcemap' : null,
    entry: {
        app : path.join(__dirname, 'src', 'app-client.js'),
    },
    devServer: {
        inline: true,
        disableHostCheck: true,   // That solved it
        port: 3000,
        contentBase: "src/static/",
        historyApiFallback: {
            index: '/index-static.html'
        }
    },
    output: {
        path: path.join(__dirname, 'src', 'static', 'js'),
        publicPath: "/js/",
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [{
            test: path.join(__dirname, 'src'),
            loader: ['babel-loader'],
            query: {
                cacheDirectory: 'babel_cache',
                plugins: ['transform-class-properties'],
                presets: debug ? ['react', 'es2015', 'react-hmre'] : ['react', 'es2015'],
            }
        }]
    },
    resolve: {
        alias: {
            'react': path.join(__dirname, 'node_modules', 'react'),
            'react-dom': path.join(__dirname, 'node_modules', 'react-dom')
        },
        extensions: ['', '.js']
    },
    plugins: debug ? [] : [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false },
                mangle: true,
                sourcemap: false,
                beautify: false,
                dead_code: true
            }),
        ]
};
