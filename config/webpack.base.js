const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const path = require('path')

module.exports = {
	// 入口文件
	entry: {
		index: './src/app.js',
	},
	output: {
		// 输出路径  必须式绝对路径
		path: path.resolve(__dirname, 'dist'),
		//清理打包文件夹
		clean: true,
		// name 动态去entry名字
		filename: '[name].bundle.js',
		publicPath: '',
	},
	// 模式
	mode: 'development',
	module: {
		rules: [
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader'
                }
            },
			{
				test: /\.(css|less|scss)$/i,
				// 链式 从后至前；链式调用；链式的每一个loader都可以对我们的源进行转换  逆序的
				use: [
					MiniCssExtractPlugin.loader,
					// 'style-loader',  // 它和mini-css-extract-plugin冲突
					'css-loader',
					{
						loader: 'postcss-loader',
						// options: {
						// 	postcssOptions: {
						// 		// 或者将插件引入写在单独的配置js中
						// 		//
	
						// 	},
						// },
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
		new HtmlWebpackPlugin({
            // 模板文件位置
			template: './public/index.html',
            // 别名
			filename: 'index.html',
            // 生成得index.html中自动引入得组件，这里设置得是entry中定义得key
            chunks:['index']
		}),
		// css 压缩
		new MiniCssExtractPlugin(),
	],
}
