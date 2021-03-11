const webpack = require('webpack');

module.exports = {
    publicPath: process.env.BASE_URL,

    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                'window.Quill': 'quill/dist/quill.js',
                'Quill': 'quill/dist/quill.js',
                'window.hljs': 'highlight.js'
            }),
        ]
    }
}
