const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        path: path.resolve(__dirname, '../wwwroot/js'),
        filename: 'bundle.js'
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }]
    },
    plugins: [
        new webpack.ProvidePlugin({ "React": "react" })
    ]
};