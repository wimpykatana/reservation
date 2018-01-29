const webpack = require("webpack");
const debug = process.env.NODE_ENV !== "production";
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports ={
    entry: "./src/index.js",
    output:{
        path: path.resolve(__dirname, 'dist/assets/js'),
        filename: "bundle.js",
        publicPath: "assets/js"
    },
    devtool: "eval-source-map",
    devServer:{
        historyApiFallback: true,
        inline: true,
        contentBase: './dist',
        port: 3005
    },
    module:{
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                loaders: [ 'style-loader', 'css-loader?sourceMap', 'autoprefixer-loader' ]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader", options: {
                        sourceMap: true
                    }
                }, {
                    loader: "autoprefixer-loader"
                },{
                    loader: "sass-loader", options: {
                        sourceMap: true,
                        data: '@import "./src/css/global.scss";',
                        includePaths: [
                            path.join(__dirname, 'src'),
                        ]
                    }
                }],
                include: path.join(__dirname, 'src')
            },
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                loader: 'url-loader?limit=100000'
            }
        ]
    }
};
