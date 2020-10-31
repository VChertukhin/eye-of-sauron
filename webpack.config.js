/* eslint-disable */
const path = require('path');

const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const __DEV__ = process.env.NODE_ENV === 'development';

const context = path.resolve(__dirname, 'src');

const getAlias = () => {
    const aliasObj = { "@": "." };

    const aliasList = [
        "events",
        "interfaces",
        "services",
        "utils",
        "constants",
        "observable"
    ];
    // resolve "@interfaces", etc.
    aliasList.map(aliasName => { aliasObj[`@${aliasName}`] = path.resolve(context, aliasName) });

    return aliasObj;
};

module.exports = {
    context,
    entry: './dev.ts',
    devtool: __DEV__ ? 'source-map' : false,
    devServer: {
        port: 5000,
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        alias: getAlias(),
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'eye-of-sauron.[hash:8].js',
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html",
            filename: "index.html",
        }),
        new CleanWebpackPlugin(),
    ],
    watch: true,
};
