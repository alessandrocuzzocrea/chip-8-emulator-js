const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

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
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          GHPAGES: JSON.stringify(GHPAGES)
        }
      }),
      new HtmlWebpackPlugin({ template: __dirname + "/public/index.html" }),
      new CopyWebpackPlugin([
        { from: __dirname + "/roms", to: "./roms" },
        { from: __dirname + "/public/style.css", to: "./style.css" }
      ]),
      new CleanWebpackPlugin([__dirname + "/dist"])
    ],
    devtool: "source-map"
  };
};
