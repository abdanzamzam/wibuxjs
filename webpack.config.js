const path = require('path');

module.exports = {
  entry: './public/javascripts/bundle.js', // File entry untuk bundling
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: './javascripts/bundle.min.js', // Output file setelah dibundle
    publicPath: '/', // Untuk mendukung react-router-dom jika digunakan
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Mendukung file .js dan .jsx
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Preset untuk ES6 dan React
          },
        },
      },
      {
        test: /\.css$/, // Mendukung file CSS
        use: ['style-loader', 'css-loader'], // Loader untuk style dan css
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: 'production',
};
