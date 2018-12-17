const path = require("path");

module.exports = {
    mode: "production",
    entry: {
        watermark: "./src/watermark.js"
    },
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "[name].js",
        library: "watermark"
    }
}