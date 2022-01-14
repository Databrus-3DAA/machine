const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: "production",
	entry: "./src/index.tsx",
	output: {
		path: resolve(__dirname, "..", "dist"),
		filename: "index.js",
	},
	module: {
		rules: [
			{
				test: /\.(tsx|ts)?$/,
				use: {
					loader: 'esbuild-loader',
					options: {
						loader: 'tsx',
						target: 'es2015'
					}
				},
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
				include: /node_modules/
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			minify: {
				minifyCSS: true,
                minifyJS: true,
                minifyURLs: true,
                removeComments: true,
                removeRedundantAttributes: true,
                collapseWhitespace: true,
                removeEmptyAttributes: true,
            },
			inject: true,
		}),
		new MiniCssExtractPlugin()
	],
	resolve: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
}