var path = require('path');
const webpack = require('webpack');

var config = {
    mode: 'development',
    devtool : 'source-map',
    entry: './frontend/main.js',
    output: {
        path: path.resolve(__dirname,'backend/public'),
        filename: 'bundles/web.bundle.js'
    },
    devServer: {
        inline: true,
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env', '@babel/react']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader'
            }, 
            {
                test: /\.css$/,
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                }
            }
        ]
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify("development")
    }),
  ], 
  optimization: {
    minimize: false,
    splitChunks: {
        chunks: 'async',
        minSize: 1000,
        minChunks: 2,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: true,
        cacheGroups: {
          default: {
            minChunks: 1,
            priority: -20,
            reuseExistingChunk: true
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          }
        }
    }
  }
}
module.exports = config;