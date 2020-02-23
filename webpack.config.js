/* jshint esversion: 6 */
const Path = require('path');
const Webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: Path.resolve(__dirname, 'build'),
    publicPath: '/build',
  },
  devServer: {
    hot: true,
    contentBase: Path.join(__dirname, 'public'),
    port: 9000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.js|\.jsx/, use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // 将 JS 字符串生成为 style 节点
          'css-loader', // 将 CSS 转化成 CommonJS 模块
          'sass-loader', // 将 Sass 编译成 CSS，默认使用 Node Sass
        ],
      },
    ],
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
  ],
};
