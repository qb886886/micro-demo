const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: "development",// development
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "build"), // 入口文件及目录
    filename: "index.js",
    libraryTarget: "system", // 指定构建时使用的库为systemjs，这里一定要使用systemjs
  },
  devtool: "source-map",
  devServer: {
    port: 9988,
    contentBase: path.join(__dirname, "build"), // 静态资源文件夹
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // react语法转换
            presets: ["@babel/preset-env", "@babel/react"]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false, // 打包是否引入js文件
      template: "./src/index.html", // 模版
    })
  ],
  // 打包排除，微前端需要使用公共react，打包不用
  externals: ["react", "react-dom", "react-router-dom"]
}
