module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/vue-bbs/dist'
        : '/'
}
