const { merge } = require('webpack-merge');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new ReactRefreshPlugin()
  ],
  devServer: {
    open: true,
    hot: true,
    historyApiFallback: true
  }
});
