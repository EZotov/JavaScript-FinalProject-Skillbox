const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const miniCssExtractPlugin = require("mini-css-extract-plugin");

let conf = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'build.js',
    publicPath: '/'
  },
  devServer: {
        port: 8000,
        historyApiFallback: true,
        hot: true,
        open: true,
        compress: true
    },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        use: ['babel-loader'],
        exclude: '/node_modules/'
      },
      {
        test: /\.(scss|css)$/,
        use: [
          miniCssExtractPlugin.loader,
          "css-loader",
          {
                    loader: 'postcss-loader',
                    options: {
                      postcssOptions: {
                        plugins: [
                          [
                            autoprefixer
                          ]
                        ]
                      },
                        sourceMap: false
                    }
          },
          "sass-loader"]
      }
    ]
  },
  plugins: [
    new miniCssExtractPlugin({filename:'build.css'}),
    new htmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin()
  ]
};

module.exports = (env, options) => {
  let isProd = options.mode === 'production';
  conf.devtool = isProd ? false :'eval-cheap-module-source-map';

  return conf;
};
