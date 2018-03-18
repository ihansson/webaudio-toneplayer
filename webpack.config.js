var webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: "./src/index.js",
    output: {
        path: __dirname + "/dist",
        filename: "TonePlayer.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    }
};