const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

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
	resolve: {
		// 尝试按顺序解析这些后缀名。如果有多个文件有相同的名字，但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀
		extensions: ['.js', '.vue', '.json'],
		// 告诉 webpack 解析模块时应该搜索的目录
		modules: [path.resolve('node_modules'), 'node_modules'],
		// 创建 import 或 require 的别名，来确保模块引入变得更简单。例如，一些位于 src/ 文件夹下的常用模块
		alias: {
			'@': path.resolve('src'),
			'@component': path.resolve('src/component'),
			'@pages': path.resolve('src/pages'),
			'@utils': path.resolve('src/utils'),
			'@assets': path.resolve('src/assets'),
		},
	},

	// 模式
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.js$/,
				exclude: /node_modules/, // 不处理该文件夹下的js文件
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.(css|less|scss)$/i,
				// 链式 从后至前；链式调用；链式的每一个loader都可以对我们的源进行转换  逆序的
				use: [
					MiniCssExtractPlugin.loader,
					'vue-style-loader',
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
					'sass-loader'
				],
			},
			{
				// 处理不了html中img图片
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader', // 依赖file-loader
				// 如需从 asset loader 中排除来自新 URL 处理的 asset，请添加 dependency: { not: ['url'] } 到 loader 配置中
				// dependency: { not: ['url'] },
				options: {
					//  图片大与8kb 就会被base64处理
					limit: 8192,
					// 关闭es6模块化 使用commonjs解析
					esModule: false,
				},
				//webpack5.0 当在 webpack 5 中使用旧的 assets loader（如 file-loader/url-loader/raw-loader 等）和 asset 模块时，
				// 你可能想停止当前 asset 模块的处理，并再次启动处理，这可能会导致 asset 重复，
				// 你可以通过将 asset 模块的类型设置为 'javascript/auto' 来解决。
				type: 'javascript/auto',
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'file-loader',
				include: [path.resolve('src/image')], // 只处理include匹配的目录
				options: {},
			},
			//   {
			// 	exclude: /\.(css|js|html)$/,
			// 	// 打包为其他资源
			// 	type: 'asset/resource',
			// },
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
			chunks: ['index'],
		}),
		// css 压缩
		new MiniCssExtractPlugin(),
		new PreloadWebpackPlugin({
			rel: 'preload',
			as(entry) {
				//资源类型
				if (/\.css$/.test(entry)) return 'style'
				if (/\.woff$/.test(entry)) return 'font'
				if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(entry)) return 'image'
				return 'script'
			},
			include: 'asyncChunks', // preload模块范围，还可取值'initial'|'allChunks'|'allAssets',
			fileBlacklist: [/\.svg/], // 资源黑名单
			fileWhitelist: [/\.script/], // 资源白名单
		}),
		new VueLoaderPlugin(),
	],
}
