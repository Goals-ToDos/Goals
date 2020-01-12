const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {

    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  devServer: {
    publicPath: '/build/',
    proxy: {
      '/user/': 'http://localhost:3000'
    }},
  mode:process.env.NODE_ENV,
  module: {
      rules: [{
      test: /\.js|jsx?/,
      exclude: path.resolve(__dirname,'node_modules'),
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    }]
  // ,{
  //   test: /\.css?/,
  //   use: ['style-loader', 'css-loader'],
  // }]
}
};