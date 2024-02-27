const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, "./src/index.jsx"),
    resolve: {
        extensions: [".jsx", ".js"],
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    },
    module: {
        rules: [
            {
                test: /\.(js)x?$/,
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
                   "sass-loader"
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
            extensions: ["js", "jsx"]
        })
    ],
    mode: "development",
    devServer: {
        port: 3000,
        historyApiFallback: true
    }
};
