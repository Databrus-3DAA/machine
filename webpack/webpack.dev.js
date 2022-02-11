const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development",
	entry: "./src/index.tsx",
	output: {
		path: resolve(__dirname, "..", "dist"),
		filename: "index.js",
	},
	devServer: {
		port: 3000,
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
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
				test: /\.(js|jsx)$/,
				use: {
					loader: 'esbuild-loader',
					options: {
						loader: 'jsx',
						target: 'es2015'
					}
				},
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
				include: /node_modules/
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			inject: true,
		}),
	],
	resolve: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
};