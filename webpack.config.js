const path = require('path')

module.exports = {
  entry: './test/system/client.ts',
  output: {
    path: path.resolve(__dirname, 'test/system'),
    filename: 'client.js',
  },
  module: {
    rules: [{ test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ }],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
}
