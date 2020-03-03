const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const merge = require("webpack-merge");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpackConfigBase = require("./webpack.base.conf");

const webpackConfigProd = {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name].[hash:8].min.js",
    publicPath: "./"
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        // 压缩js
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {}
      })
    ]
  },
  plugins: [
    new OptimizeCssAssetsPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:8].min.css"
    }),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin()
  ]
};

module.exports = merge(webpackConfigBase, webpackConfigProd);
