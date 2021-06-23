const path = require("path");

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    output: {
        path: path.join(__dirname, "/public/"),
        filename: 'main.js',
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [

                    {
                        loader: "babel-loader",
                        options: {
                            sourceMap: true,
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        }
                    }
                ]
            },
        ]
    }
};