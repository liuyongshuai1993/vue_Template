const { merge } = require('webpack-merge')
const base = require('./webpack.base')
const path = require('path')
//
const BundleAnalyzerPlugin =
	require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// 清理文件缓存
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

console.log(process)

module.exports = merge(base, {
	mode: 'production',
	output: {
		filename: '[name]-[hash].js',
	},
	performance: {
		hints: 'error',
		maxEntrypointSize: 10000000,
		maxAssetSize: 30000000,
	},
	plugins: [
		new CleanWebpackPlugin(),
		new BundleAnalyzerPlugin(),
		new UglifyJsPlugin({
			uglifyOptions: {
				// 删除console debugger 删除警告
				compress: {
					// warnings: false,
					drop_debugger: true,
					drop_console: true,
					pure_funcs: ['console.log'], // 移除console
				},
				// 删除注释
				output: {
					comments: false,
				},
                warnings: false,	//	这样写就不报错  
			},
			sourceMap: true,
			parallel: true,
		}),
	],
})
