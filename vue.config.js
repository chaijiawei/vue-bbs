const webpack = require('webpack');

module.exports = {
    publicPath: process.env.BASE_URL,

    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                'window.hljs': 'highlight.js'
            }),
        ]
    }
}
