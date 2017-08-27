// const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  devtool: '#source-map',
  entry: path.resolve(__dirname, './main.js'),
  output: {
    filename: 'ktw.api.min.js',
    path: path.resolve(__dirname, './dist/'),
    library: 'ktw',
    libraryTarget: 'umd',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //   },
    //   sourceMap: true,
    // }),
    new CleanWebpackPlugin(['dist/*'], {
      root: __dirname,
      verbose: true,
      dry: false,
    }),
    // new webpack.BannerPlugin('Copyright Ktw inc.'),
  ],
};
