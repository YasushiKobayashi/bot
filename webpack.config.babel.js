import webpack from 'webpack';
import path from 'path';
import glob from 'glob';
import nodeExternals from 'webpack-node-externals';

import loaders from './webpack.loaders';

const jsBasePath = path.resolve(__dirname, './es');

const targets = glob.sync(`${jsBasePath}/*.js`);
const entries = {};

targets.forEach((value) => {
  const re = new RegExp(`${jsBasePath}/`);
  const key = value.replace(re, '');
  entries[key] = value;
});

module.exports = {
  entry: entries,
  output: {
    path: path.join(__dirname, 'js'),
    filename: '[name]',
  },
  module: {
    loaders,
  },
  target: 'node',
  node: {
    __filename: true,
    __dirname: true,
  },
  externals: nodeExternals(),
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin({
  //     compress: {
  //       warnings: false,
  //       drop_console: true,
  //       drop_debugger: true,
  //     },
  //   }),
  // ],
};
