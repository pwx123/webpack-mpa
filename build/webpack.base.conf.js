const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const glob = require("glob");

// 遍历所有入口
function getEntry() {
  let enrty = {};
  glob.sync("./src/pages/**/*.ts").forEach(function(path) {
    let start = "./src/pages/".length;
    let end = path.length - ".ts".length;
    var name = path.slice(start, end);
    name = name.split("/")[0];
    let arr = [path];
    enrty[name] = arr;
  });
  return enrty;
}

// 遍历生成 HtmlWebpackPlugin
function getHtmlConfig() {
  var htmlConfigArray = [];
  var entry = new getEntry();
  Object.keys(entry).forEach(name => {
    htmlConfigArray.push(
      new HtmlWebpackPlugin({
        template: `./src/pages/${name}/${name}.html`,
        filename: `${name}.html`,
        inject: true, // js插入的位置
        hash: true, // .js?[hash]
        chunks: ["vendor", "common", name], // 需要引入的 chunk
        // 压缩html
        minify:
          process.env.NODE_ENV === "development"
            ? false
            : {
                removeComments: true, //删除注释
                removeCommentsFromCDATA: true, //删除css,js注释
                collapseWhitespace: true, //删除空格
                removeAttributeQuotes: true //删除双引号
              }
      })
    );
  });
  return htmlConfigArray;
}

module.exports = {
  entry: getEntry(),
  module: {
    rules: [
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8129,
              fallback: "file-loader",
              publicPath: "../images", // jpg|png|svg|gif 的前置路径
              outputPath: "images/"
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, "../src")],
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        include: [path.resolve(__dirname, "../src")],
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"] //引入模块时不需要拓展名
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 抽离第三方插件
        vendor: {
          test: /[\\/]node_modules[\\/]/, // node_modules下的第三方包
          chunks: "initial",
          name: "vendor", // 打包后的文件名
          priority: 10 // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
        },
        // 抽离公共组件
        utils: {
          chunks: "initial", // 入口文件的公共引用
          name: "common",
          minSize: 0, // 只要超出0字节就生成一个新包
          minChunks: 2 // 最小引用次数
        }
      }
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.$": "jquery",
      "window.jQuery": "jquery"
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../static"),
        to: path.resolve(__dirname, "../dist/static")
      }
    ]),
    ...getHtmlConfig()
  ]
};
