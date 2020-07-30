var path = require('path');
var webpack = require('webpack');

module.exports = {
    // mode: 'development',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        // publicPath: '/dist/',
        filename: process.env.NODE_ENV === 'development' ? 'jutil.js' : 'jutil.min.js',
        libraryTarget: 'umd',
        libraryExport: 'default',
    },
    devtool: 'source-map',
    module: {   
        rules: [
            {
                test: /\.js?$/,
                loader: "babel-loader",
                exclude: /node_modules/
            }
        ]
    }
}