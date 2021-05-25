const HtmlWebpackPlugin = require('html-webpack-plugin'),
  { resolve } = require('./utils')

const plugins = [
  new HtmlWebpackPlugin({
    title: 'Hello react + ts',
    template: resolve('public/index.html')
  })
]

module.exports = {
  plugins
}