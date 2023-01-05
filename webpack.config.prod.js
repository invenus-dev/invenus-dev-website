const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // set env mode
  mode: 'production',
  // main entry file
  entry: './src/index.ts',
  // output location and file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // describes loader rules - what to do on what extensions
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
    ],
  },
  // imports automatic extensions adding
  resolve: {
    extensions: ['.ts', '.js'],
  },
  // webpack plugins - applied on project level
  plugins: [new CleanPlugin.CleanWebpackPlugin(), new MiniCssExtractPlugin()],
};
