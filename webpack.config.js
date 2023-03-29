const webpack = require('webpack')
const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const COMMON_PLUGINS = [
  new webpack.DefinePlugin({
    CF_VERSION: JSON.stringify(require('./package.json').version),
  }),
]

module.exports = ({ production }) => {
  const env = production ? 'production' : 'dev'
  console.log(`Build for ${env}`)

  // Default config
  const config = {
    mode: production ? 'production' : 'development',
    entry: {
      'captain-fact-overlay-injector': './src/index.js',
      'captain-fact-overlay-injector.min': './src/index.js',
    },
    devtool: 'inline-source-map',
    devServer: {
      static: { directory: path.join(__dirname, 'dist') },
      port: 3342,
    },
    plugins: COMMON_PLUGINS.concat([]),
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        'env-constants': path.resolve(__dirname, `constants/${env}.js`),
      },
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              name: '[path][name].[ext]',
              context: 'src',
              publicPath: production ? 'https://embed.captainfact.io' : '/',
            },
          },
        },
      ],
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      library: 'CaptainFactOverlayInjector',
      libraryTarget: 'umd',
      libraryExport: 'default',
    },
  }

  // Production override
  if (production) {
    delete config.devtool
    config.plugins = COMMON_PLUGINS.concat([
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      new CompressionPlugin({
        test: /\.js/,
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: 'src/assets', to: 'assets' }],
      }),
    ])
  }

  return config
}
