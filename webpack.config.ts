const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, "./src/index.tsx"),
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            additionalData:
                                "@import '@/assets/scss/vars.scss';@import '@/assets/scss/mixins.scss';@import '@/assets/scss/functions.scss';"
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|pdf)$/i,
                type: "asset/resource"
            },
            {
                test: /\.svg$/i,
                type: "asset/inline"
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "bundle.js",
        publicPath: "/"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/index.html")
        }),
        new ESLintPlugin({
            emitError: true,
            emitWarning: true,
            failOnError: true,
            extensions: ["ts", "tsx"]
        })
    ],
    mode: "development",
    devServer: {
        port: 3000,
        historyApiFallback: true
    }
};
