const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
require("dotenv").config({ path: "../.env" });

module.exports = {
    entry: path.resolve(__dirname, "..", "./src/index.jsx"),
    resolve: {
        extensions: [".jsx", ".js"],
        alias: {
            "@": path.resolve(__dirname, "..", "./src")
        }
    },
    module: {
        rules: [
            {
                test: /\.(js)x?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "..", "./public"),
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "..", "./src/index.html")
        }),
        new webpack.DefinePlugin({
            "process.env": {
                BASE_HOST: JSON.stringify(process.env.BASE_HOST),
                BASE_PORT: JSON.stringify(process.env.BASE_PORT)
            }
        })
    ]
};
