var path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
      'app': 'app/index',
      'style': path.resolve('app/style/application.scss')
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, './build'),
    sourceMapFilename: '[file].map'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loader: "style!css!sass",
        exclude: /(node_modules|bower_components)/ },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$/, loader: "file"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/templates/index.ejs',
      title: 'nthn.crlsn',
      appMountId: ['app'],
      inject: false
    }),
    new ExtractTextPlugin('[name].css')
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    modulesDirectories: ['node_modules'],
    root: [
        path.resolve('./'),
        path.resolve('./app/style')
    ]
  }
};
