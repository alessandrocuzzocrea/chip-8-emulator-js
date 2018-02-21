const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  context: __dirname + "/src",
  entry: "./index.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({ template: __dirname + "/public/index.html" }),
    new CopyWebpackPlugin([
      { from: __dirname + "/roms", to: "./roms" },
      { from: __dirname + "/public", to: "./", ignore: ["*.html"] }
    ]),
    new CleanWebpackPlugin([__dirname + "/dist"])
  ],
  devtool: "source-map"
};
