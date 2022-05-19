const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPWAManifest = require('webpack-pwa-manifest');
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
      publicPath: '',
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,      
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './index.html' }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',
      }),
      new WebpackPWAManifest({
        filename: 'manifest.json',
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'A Simple Text Editor with Robust PWA Functionality',
        startURL: './index.html',
        theme_color: '#225ca3',
        background_color: '#225ca3',
        icons: {
          src: './src/images/logo.png',
          sizes: [72, 96, 128, 144, 152, 192, 384, 512],
          destination: './assets/icons',
        },
        id: 'jate',
        related_applications: [{
          platform: "webapp",
          id: "jate"
        }],
      })
    ],
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[name][ext]'
          }
        },
        {
          test: /\.(ico)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/icons/[name][ext]'
          }
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ],
    },
  };
};
