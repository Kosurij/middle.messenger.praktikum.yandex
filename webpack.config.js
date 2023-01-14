const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devtool: 'source-map',
  output: {
    publicPath: "auto",
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].chunk.js"
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  devServer: {
    compress: true,
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
      },
      {
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|gif|eot|svg|ttf|woff(2)?|(jpeg|jpg)(\?[0-9]+)?)$/,
        type: "asset/inline"
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./static/favicon/favicon.png",
      filename: './index.html',
    }),
  ],
}
