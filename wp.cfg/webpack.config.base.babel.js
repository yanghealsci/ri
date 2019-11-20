const path = require('path')
const webpack = require('webpack')

const {
  ProvidePlugin
} = webpack

module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/](.*)\.js$/,
          name: 'common',
          chunks: 'all'
        }
      }
    }
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [['@babel/env', { modules: false }], '@babel/react']
          }
        }]
      }, {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[hash:20].[ext]'
        }
      }]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    enforceExtension: false,
    modules: [
      path.join(__dirname, '../src'),
      path.join(__dirname, '../node_modules')
    ]
  },
  plugins: [
    new ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom'
    })
  ]
}