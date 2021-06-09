const webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  { resolve } = require('./utils'),
  FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'),
  BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
  { isProd } = require('./utils')

const plugins = [
  new HtmlWebpackPlugin({
    title: 'Hello react + ts',
    template: resolve('public/index.html'),
    vendor: [
      resolve('lib/dll_react.js'),
      resolve('lib/ffmpeg.min.js')
    ]
  }),
  new webpack.HotModuleReplacementPlugin(),
  new FriendlyErrorsPlugin(),
  new webpack.DllReferencePlugin({
    // 描述 react 动态链接库的文件内容
    manifest: require('../lib/react-mainfest.json'),
  }),
  isProd ? new BundleAnalyzerPlugin() : () => {},
]

module.exports = {
  plugins
}