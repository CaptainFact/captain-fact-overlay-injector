const webpack = require('webpack')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin")


module.exports = (env='dev') => {
  // Default config
  const config = {
    entry: {
      'captainfact-overlay-injector': './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {contentBase: './dist', port: 3342},
    plugins: [new BundleAnalyzerPlugin({openAnalyzer: false})],
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {'env-constants': path.join(__dirname, `./constants/${env}.js`)}
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }, {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
            'postcss-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader']
        }
      ]
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      library: 'CaptainFactOverlayInjector',
      libraryTarget: 'umd'
    }
  };

  // Production override
  if (env === 'production') {
    delete config.devtool
    delete config.devServer
    config.entry['captainfact-overlay-injector.min'] = './src/index.js'
    config.plugins = [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new UglifyJSPlugin({
        include: /\.min\.js$/
      }),
      new CompressionPlugin({
        test: /\.js/
      })
    ]
  }

  return config
}