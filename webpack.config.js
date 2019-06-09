const path = require('path');

module.exports = {
  mode: "development",
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/dist'), 
    publicPath: "dist/"
  }, 
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./public", 
    port: 3000, 
    proxy: {
      "/api": "http://localhost"
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
        'style-loader',
        'css-loader'
        ]
      }, 
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          "file-loader?name=images/[name].[ext]"
        ]
      }, 
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          "babel-loader"
        ]
      }
    ]
  }
};

