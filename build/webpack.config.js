const { resolve } = require('./utils'),
  { loaders } = require('./loaders'),
  { plugins } = require('./plugins')

module.exports = {
  devtool: "inline-source-map",
  entry: {
    app: "./src/index.tsx"
  },
  output: {
    path: resolve('dist'),
    filename: "[name].[chunkhash:8].js",
    clean: true
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      '@': resolve('src'),
      'pages': resolve('src/pages'),
      'utils': resolve('src/utils'),
      'services': resolve('src/services'),
      'stores': resolve('src/stores')
    },
  },
  plugins,
  module: {
    rules: loaders
  },
  devServer: {
    contentBase: './dist',
    host: '127.0.0.1',
    port: 5000,
    hot: true,
    proxy: {
      '/api' : {/* web-service总入口 */
        target: 'http://127.0.0.1:3000/',
        pathRewrite: { '^/api': '' },
        secure: false,
        changeOrigin: true,
      },
    },
    inline: true,
	  historyApiFallback: true
  },
  watchOptions: {
    ignored: 'node_modules/**'
  },
  target: "web",
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
}