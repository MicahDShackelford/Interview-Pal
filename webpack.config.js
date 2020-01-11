const path = require('path');
module.exports = {
  mode: 'development',
  entry: './public/src/index.js',
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      }
    ]
  }
}