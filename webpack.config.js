let path = require("path");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./dist/"),
    filename: "main.js",
    publicPath: "/"
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css",
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              "@babel/plugin-transform-react-jsx",
              "@babel/plugin-proposal-class-properties"
            ]
          }
        }
      },
      {
        // test: /\.module\.css$/,
        test: /\.(sass|css|scss)$/,
        // exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]__[hash:base64:5]"
              }
            }
          },
        ]
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 8080,
    historyApiFallback: {
      index: '/index.html'
    }
  }
};
