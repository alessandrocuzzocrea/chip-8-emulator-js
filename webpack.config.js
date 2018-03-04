const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = env => {
  const GHPAGES = env && env.GHPAGES;

  const plugins = [
    new webpack.DefinePlugin({
      "process.env": {
        GHPAGES: JSON.stringify(GHPAGES)
      }
    }),
    new HtmlWebpackPlugin({ template: "index.html" }),
    new CopyWebpackPlugin([{ from: __dirname + "/roms", to: "./roms" }]),
    new CleanWebpackPlugin([__dirname + "/dist"]),
    new ExtractTextPlugin("styles.css")
  ];

  if (GHPAGES) {
    plugins.push(new UglifyJsPlugin({ sourceMap: false }));
  }

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
                loader: "css-loader",
                options: {
                  minimize: GHPAGES
                }
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
    plugins: plugins,
    devtool: "source-map"
  };
};
