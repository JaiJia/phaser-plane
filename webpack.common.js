const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './index.js',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),
            filename: 'index.html',
            title: 'Yo Yo Yo!',
        }),
        new CopyPlugin([
            { from: 'assets', to: 'assets' },
            'CNAME',
            'favicon.ico',
        ]),
        new webpack.ProvidePlugin({
            Phaser: 'phaser',
        })
    ],
    module: {
        rules: [
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                    'image-webpack-loader'
                ]
            },
            // { // assets文件夹是复制到dist的，所以这里的压缩暂时无效
            //     test: /\.(png|jpg|jpeg|gif)$/,
            //     use: [
            //         {
            //             loader: 'img-loader',
            //             options: {
            //                 plugins: [
            //                     // 用于图片压缩的imagemin-pngquant，还有一个隐式调用的加载器imagemin-loader
            //                     require('imagemin-pngquant')({
            //                         quality: [0.3, 0.5] // 图片压缩30%~50%
            //                     })
            //                 ]
            //             }
            //         }
            //     ]
            // }
        ]
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
};