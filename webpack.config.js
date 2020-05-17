var path = require('path');
const webpack = require('webpack');

var config = {
    mode: 'production',
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
              test: /\.css$/i,
              use: ['style-loader', 'css-loader'],
            },
        ]
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      AUTH_TOKEN: JSON.stringify("Bearer 12tFt61L33aZ0qPEWU3lMRYKuUJye69T27wISkjWfB97I8JfUU1ritRipl0Jtvi3XB1SA7LKGUNpf61tnsNjug")
    }),
  ], 
  optimization: {
    minimize: true,
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