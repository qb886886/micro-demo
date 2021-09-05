const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 导入模块插件
const MFP = require('webpack').container.ModuleFederationPlugin

module.exports = {
  mode: 'development', // development/production/none
  entry: "./src/index.js", // 打包入口
  output: { // 打包出口
    filename: './bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: { // 服务器配置
    contentBase: path.join(__dirname, 'dist'),
    port: 9998,
    open: true
  },
  module: { // 加载模块
    rules: [
      {
        test: /\.js$/, // 加载js规则
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-env", "@babel/react"]
            }
          }
        ]
      }
    ]
  },
  plugins: [ // 插件
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new MFP({
      filename: 'user-module.js', // 对外提供导入的文件 filename
      name: 'microTeam', // 微应用名称
      remotes: { // 导入
        iBaseModule: 'iBases@http://localhost:9999/iBase-module.js'
      },
      exposes: { // 导出
        // 格式 名字: 具体组件路
        './login': './src/Login.js',
        './register': './src/Register.js'
      }
    })
  ]
}
