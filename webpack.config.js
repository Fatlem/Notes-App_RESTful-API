const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]',
        }
      },
    ],
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  
  devServer:{
    static:{
      directory:path.join(__dirname,'dist'),
    }, 
    compress:true,
    port :3000,
    open:true,
    hot:true,
    historyApiFallback:true, 
   }
};
