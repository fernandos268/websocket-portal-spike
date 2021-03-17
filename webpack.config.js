require('dotenv').config()
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDevelopment = process.env.NODE_ENV === 'development'

const svgoConfig = JSON.stringify({
   plugins: [
      { removeTitle: true },
      { convertColors: { shorthex: false } },
      { convertPathData: false }
   ]
});

module.exports = {
   entry: {
      main: './src/index.js',
   },
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      publicPath: '/',
   },
   devtool: 'inline-source-map',
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
         },
         {
            test: /\.(png|jpg|gif)$/,
            loader: 'file-loader',
            options: {
               outputPath: 'images',
            },
         },
         {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     name: '[name].[ext]',
                     outputPath: 'fonts/',
                  },
               },
            ],
         },
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
         },
         {
            test: /\.module\.s(a|c)ss$/,
            loader: [
               'style-loader',
               {
                  loader: 'css-loader',
                  options: {
                     modules: true,
                     localIdentName: '[name]__[local]___[hash:base64:5]',
                     camelCase: true,
                     sourceMap: isDevelopment
                  }
               },
               {
                  loader: 'sass-loader',
                  options: {
                     sourceMap: isDevelopment
                  }
               }
            ]
         },
         {
            test: /\.s(a|c)ss$/,
            exclude: /\.module.(s(a|c)ss)$/,
            loader: [
               'style-loader',
               'css-loader',
               {
                  loader: 'sass-loader',
                  options: {
                     sourceMap: isDevelopment
                  }
               }
            ]
         }
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({ template: 'src/index.html' })
   ],
   devServer: {
      historyApiFallback: true,
      port: 9002,
      // open: true,
      hot: true,
   }
};
