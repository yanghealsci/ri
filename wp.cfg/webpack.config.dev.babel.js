const path = require('path')
const webpack = require('webpack')
const base = require('./webpack.config.base.babel')
const merge = require('webpack-merge')

const {
  NoEmitOnErrorsPlugin,
  HotModuleReplacementPlugin,
  NamedModulesPlugin,
  DefinePlugin
} = webpack

module.exports = (env) => {
  return merge(base, {
    mode: 'development',
    devtool: /* 'cheap-module-eval-source-map' */ 'eval',
    entry: {
      hotloader: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8000',
        'webpack/hot/only-dev-server'
      ],
      bundle: [path.resolve(__dirname, '../src/index.js')]
    },
    output: {
      path: path.resolve(__dirname, '../dev/dist'),
      publicPath: '/dist/'
    },
    devServer: {
      hot: true,
      contentBase: path.resolve(__dirname, '../dev'),
      compress: true,
      // historyApiFallback: true,
      proxy: {
        '/prod/fake-auth': {
          target: 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com',
          secure: false,
          changeOrigin: true
        }
      }
    },
    plugins: [
      new DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development')
        }
      }),
      new NoEmitOnErrorsPlugin(),
      new HotModuleReplacementPlugin(),
      // enable HMR globally
      new NamedModulesPlugin(),
      new webpack.ProvidePlugin({
        globalConfig: path.resolve(__dirname, '../env/config-dev')
      })
      // prints more readable module names in the browser console on HMR updates
    ]
  })
}