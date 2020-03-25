const Path = require('path');
const Webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: Path.resolve(__dirname, 'build'),
    publicPath: 'build',
  },
  devServer: {
    hot: true,
    contentBase: Path.join(__dirname, 'public'),
    port: 9000,
    open: true,
    proxy: [{
      context: ['/api', '/public'],
      target: 'http://localhost:7001',
    }],
  },
  module: {
    rules: [
      {
        test: /\.js|\.jsx/, use: 'babel-loader',
      },
      {
        test: /\.scss|\.css$/,
        use: [
          'style-loader', // 将 JS 字符串生成为 style 节点
          'css-loader', // 将 CSS 转化成 CommonJS 模块
          'sass-loader', // 将 Sass 编译成 CSS，默认使用 Node Sass
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
            loader: 'url-loader',
            options: {
              publicPath:  'https://localhost:7001/public/img',
            }
        },
      },
      // {
      //   test: /\.(png|jpg|gif|jpeg)$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 8192,
      //         // 使文件大小小于此limit值(单位为byte)的文件转换为base64格式
      //         // 大于此limit的, 会执行options中的fallback配置项插件, fallback默认值为file-loader, 
      //         // 而url-loader的options配置项也会被传递给file-loader
      //         limit:10,
      //         // 根据环境使用cdn或相对路径
      //         // publicPath: process.env.NODE_ENV === 'production' ? 'https://localhost:7001/public/img' : './',
      //         publicPath:  'https://localhost:7001/public/img',
      //         // 将图片打包到dist/img文件夹下, 不配置则打包到dist文件夹下
      //         outputPath: 'img',
      //         // 配置打包后图片文件名
      //         // name: '[name].[ext]',
      //       },
      //     },
      //   ],
      // },
    ],
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
  ],
};
