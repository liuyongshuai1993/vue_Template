const { merge } = require('webpack-merge')
const base = require('./webpack.base')
const path = require('path')
// 清理文件缓存
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(base, {
	mode: 'production',
	output: {
		filename: '[name]-[hash].js',
	},
    performance : {
        hints: 'error',
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000
      },
	plugins: [new CleanWebpackPlugin()],
})
