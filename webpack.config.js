const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = env => {
  let GHPAGES = false;
  if (env) GHPAGES = env.GHPAGES || false;
  return {
    context: __dirname + "/src",
    entry: "./index.js",
    output: {
      path: __dirname + "/dist",
      filename: "bundle.js"
    },
    module: {
      loaders: [
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: "css-loader"
              },
              {
                loader: "sass-loader"
              }
            ],
            fallback: "style-loader"
          })
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          GHPAGES: JSON.stringify(GHPAGES)
        }
      }),
      new HtmlWebpackPlugin({ template: "index.html" }),
      new CopyWebpackPlugin([{ from: __dirname + "/roms", to: "./roms" }]),
      new CleanWebpackPlugin([__dirname + "/dist"]),
      new ExtractTextPlugin("styles.css"),
      new UglifyJsPlugin({ sourceMap: true })
    ],
    devtool: "source-map"
  };
};
