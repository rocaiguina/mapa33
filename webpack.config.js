'use strict';

const path = require('path');
process.traceDeprecation = true;

module.exports = {
  entry: './app/origin.js',
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: 'bundle.js'
  },
  mode: 'development',
  context: __dirname,
  devtool: 'source-map',
  externals: {
    "fs": "require('fs')"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/react'],
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      }, {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'file-loader'],
      }, {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      }, {
        test: /\.(scss|sass)$/,
        loader: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJ
        ]
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
            loader: 'less-loader',
            options: {
              modifyVars: {
                'font-variant-base': 'normal',
                'font-feature-settings-base': 'normal'
              },
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  }
};
