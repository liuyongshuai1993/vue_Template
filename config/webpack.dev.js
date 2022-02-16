const { merge } = require('webpack-merge')
const base = require('./webpack.base')
const path = require('path')

module.exports = merge(base, {
	mode: 'development',
	devServer: {
		static: {
			directory: path.join(__dirname, 'public'),
		},
		compress: true,
		port: 9000,
	},
})
