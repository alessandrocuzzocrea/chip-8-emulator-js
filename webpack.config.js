const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  context: __dirname + "/src",
  entry: "./index.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new CopyWebpackPlugin([{ from: __dirname + "/roms", to: "./roms" }])
  ],
  devtool: "source-map"
};
