const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './client/index.html',
        filename: 'index.html',
        chunks: ['main'],
      }),

      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E',
        description: 'A simple text editor Progressive Web App.',
        background_color: '#ffffff',
        theme_color: '#317EFB',
        start_url: '/',
        display: 'standalone',
        icons: [
          {
            src: path.resolve('client/assets/icons/icon_96x96.png'),
            sizes: [72, 96, 128, 144, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),  

      new InjectManifest({
        swSrc: './client/src-sw.js',
        swDest: 'src-sw.js',
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },  
      ],
    },
  };
};