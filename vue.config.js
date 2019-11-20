const webpack = require('webpack')
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/webnode/' : '/',
    runtimeCompiler: true,
    productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
    devServer: {
        proxy: {
            '/party/*': {
                // target: 'http://10.72.24.255:8098', 
                target: 'http://139.9.44.85:8098',
                ws: true,
                changeOrigin: true
            }
        }
    },
    lintOnSave:false,
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                "window.jQuery": 'jquery'
            })
        ]
    }
}