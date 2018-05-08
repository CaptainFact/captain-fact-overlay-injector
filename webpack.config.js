const webpack = require('webpack')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')


const COMMON_PLUGINS = [
  new webpack.DefinePlugin({
    CF_VERSION: JSON.stringify(require('./package.json').version)
  })
]

module.exports = (env='dev') => {
  const isProd = env === 'production'
  console.log(`Build for ${env}`)

  // Default config
  const config = {
    entry: {
      'captain-fact-overlay-injector': './src/index.js',
      'captain-fact-overlay-injector.min': './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {contentBase: './dist', port: 3342},
    plugins: COMMON_PLUGINS.concat([]),
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        'env-constants': path.join(__dirname, `./constants/${env}.js`),
        'react': 'preact-compat',
        'react-dom': 'preact-compat'
      }
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
          use: {
            loader: 'file-loader',
            options: {
              name: '/[path][name].[ext]',
              context: 'src',
              publicPath: isProd ? 'https://embed.captainfact.io' : ''
            }
          }
        }
      ]
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      library: 'CaptainFactOverlayInjector',
      libraryTarget: 'umd'
    }
  }

  // Production override
  if (isProd) {
    delete config.devtool
    config.plugins = COMMON_PLUGINS.concat([
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new UglifyJSPlugin({
        include: /\.min\.js$/
      }),
      new CompressionPlugin({
        test: /\.js/
      })
    ])
  }

  return config
}