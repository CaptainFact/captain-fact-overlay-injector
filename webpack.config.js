const path = require('path');
const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 3342
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'env-constants': path.join(__dirname, `./constants/${env}.js`)
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
        use: ['file-loader']
      }
    ]
  },
  output: {
    filename: 'captainfact-overlay-injector.js',
    path: path.resolve(__dirname, 'dist')
  }
};