var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    mode: 'production',
    entry: './src/treeList.js',
    output: {
        path: path.resolve('lib'),
        filename: 'TreeEditable.js',
        libraryTarget: 'commonjs2'
    },
    plugins: [new MiniCssExtractPlugin()],
    module: {
	rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
          {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
          }
        ]
    }
}
