module.exports = [
  {
    test: /\.js?$/,
    exclude: /(node_modules|bower_components|assets|public\/)/,
    loader: 'babel-loader?presets[]=es2015',
  },
];
