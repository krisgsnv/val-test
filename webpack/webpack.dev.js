const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "cheap-module-source-map",
    plugins: [
        new ESLintPlugin({
            context: "../",
            emitError: true,
            emitWarning: true,
            failOnError: true,
            extensions: ["js", "jsx"]
        })
    ],
    devServer: {
        port: 3000,
        historyApiFallback: true
    }
};
