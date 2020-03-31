let path = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let HtmlWebpackPlugin = require('html-webpack-plugin');
let autoprefixer = require('autoprefixer');
let cssnano = require('cssnano');
let CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
    let production = options.mode === 'production';

    let conf = {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/app.js',
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),   
            overlay: true,
            historyApiFallback: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
                // {
                //     test: /jquery.+\.js$/,
                //     use: [{
                //         loader: 'expose-loader',
                //         options: 'jQuery'
                //     },{
                //         loader: 'expose-loader',
                //         options: '$'
                //     }]
                // },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true,
                                    url: false,
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: [
                                        autoprefixer({
                                            browsers:['> 1%', 'last 2 version']
                                        }),
                                        cssnano ({})
                                    ],
                                    sourceMap: production ? false : 'inline'
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                        ]
                    })
                },
                {
                    test: /\.(gif|png|jpe?g|svg)$/i,
                    use: [
                        'file-loader',
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                bypassOnDebug: true, // webpack@1.x
                                disable: true, // webpack@2.x and newer
                            },
                        },
                    ],
                },
            ]
        },
        plugins: [
            new ExtractTextPlugin("./css/style.css"),
            // new HtmlWebpackPlugin({
            //     filename: 'index.html',
            //     template: 'src/index.html'
            // }),
            //img,
            new CopyWebpackPlugin([{
                from: './src/img',
                to: './img'
              },
              {
                from: './src/fonts',
                to: './fonts'
              },
            ]),
        ],
    }

    conf.devtool = production ? false : 'eval-sourcemap';
    return conf;
}