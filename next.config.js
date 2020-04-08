const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, webpack }
    ) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            Components: path.resolve(__dirname, 'Components/'),
            Containers: path.resolve(__dirname, 'containers/'),
            Helpers: path.resolve(__dirname, 'helpers/'),
            Redux: path.resolve(__dirname, 'redux/'),
            Models: path.resolve(__dirname, 'models/'),
            Pages: path.resolve(__dirname, 'styles/pages'),
            GlobalConstants: path.resolve(__dirname, './GlobalConstants'),
            DataMapping: path.resolve(__dirname, './dataMapping/'),
        }
        config.module = {
            ...config.module,
            noParse: /(mapbox-gl)\.js$/
        };
        config.module.rules.push(...[
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: "css-loader", options: { url: false, sourceMap: true } },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                includePaths: ["./styles", "./node_modules"]
                            }
                        }
                    }
                ]
            },
            {
                include: /\.(eot|ttf|woff|woff2|png|svg|ico|gif|jpg)$/,
                loader: 'file-loader',
                query: {
                    name: '[path][name].[ext]'
                }
            },
            {
                test: /\.(json)$/,
                type: 'javascript/auto',
                loader: 'file-loader',
                query: {
                    name: '[path][name].[ext]'
                }
            }
        ]);
        config.plugins = [
            ...config.plugins,
            ...[
                new MiniCssExtractPlugin({
                    filename: "[name].[contenthash].css"
                }),
                new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
                new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
            ]
        ];
        return config;
    }
};