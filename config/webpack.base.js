const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const path = require('path')

module.exports = {
	// 入口文件
	entry: './src/app.js',
	output: {
		// 输出路径  必须式绝对路径
		path: path.resolve(__dirname, 'dist'),
		//清理打包文件夹
		clean: true,
	},
	// 模式
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.(css|less|scss)$/i,
				// 链式 从后至前；链式调用；链式的每一个loader都可以对我们的源进行转换  逆序的
				use: [
					MiniCssExtractPlugin.loader,
					// 'style-loader',  // 它和mini-css-extract-plugin冲突
					'css-loader',
                    {
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
                                // 或者将插件引入写在单独的配置js中
                                //   
								// config: POSTCSSCONFIG,
                                // 版本5.0配置
                                plugins: [require('postcss-preset-env')()]
                                // 版本4.0配置
								// plugins: () => [
                                //     // 帮助postcss 找到 package.json中 browserslist里面的配置，通过配置加载指定的css兼容性样式 
								// 	require('postcss-preset-env')(),
								// ],
							},
						},
					},
					'less-loader',
					'sass-loader',
				],
			},
		],
	},
	optimization: {
		minimizer: [
			// 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
			// `...`,
			new CssMinimizerPlugin(),
		],
	},
	plugins: [
		new HtmlWebpackPlugin({ template: './src/index.html' }),
		// css 压缩
		new MiniCssExtractPlugin(),
	],
}
