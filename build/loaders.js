const { resolve } = require('./utils')

const loaders = [
  {
    test:  /\.(js|jsx|ts|tsx)$/,
    include: [resolve("src")],
    exclude: /node_modules/,
    use: [
      'cache-loader',
      "babel-loader"
    ],
  },
  {
    test: /\.(scss|css)$/,
    use: ['style-loader', {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
        },
      }, 'postcss-loader'],
  },
  {
    test: /\.(png|jpe?g|gif|svg)$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 1024 * 200,
        }
      }
    ]
  },
  {
    test: /\.(woff2?|eot|ttf|otf)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 1024 * 200,
        }
      }
    ]
  },
  {
    test: /\.(ogg|mp3|wav|mpe?g)$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 1024 * 200,
        }
      }
    ]
  },
  {
    test: /\.(ts|tsx)?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  }
]

module.exports = {
  loaders
}