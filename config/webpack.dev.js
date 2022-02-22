const { merge } = require('webpack-merge')
const base = require('./webpack.base')
const path = require('path')

module.exports = merge(base, {
	mode: 'development',
	devServer: {
		// static: {
		// 	directory: path.join(__dirname, 'public'),
		// },
        static:[
            //该配置项允许配置从目录提供静态文件的选项（默认是 'public' 文件夹）
            path.resolve(__dirname,'dist'),
            path.resolve(__dirname,'pulic')
        ],
		compress: true,
        host: 'localhost',
		port: 9000,
        // 默认打开浏览器
        open:true
	},
    devtool: 'eval-source-map',
})
