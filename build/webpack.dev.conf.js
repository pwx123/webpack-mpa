const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpackConfigBase = require("./webpack.base.conf");

const webpackConfigDev = {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name].bundle.js"
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "../dist"),
    port: 8081,
    publicPath: "/",
    host: "127.0.0.1"
  }
};

module.exports = merge(webpackConfigBase, webpackConfigDev);
