const webpack = require("webpack");

module.exports = {
  webpack: {
    alias: {
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: "util",
      buffer: "buffer",
      assert: "assert",
      crypto: "crypto-browserify",
      http: "stream-http",
      https: "https-browserify",
      os: "os-browserify/browser",
      url: "url",
      querystring: "querystring-browser",
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
      }),
    ],
    resolve: {
      fallback: {
        buffer: require.resolve("buffer/"),
        querystring: require.resolve("querystring-browser"),
        https: require.resolve("https-browserify"),
        stream: require.resolve("stream-browserify"),
        http: require.resolve("stream-http"),
      },
    },
    devServer: {
      setupMiddlewares: (middlewares, devServer) => {
        // Custom middleware can be added here if needed
        if (!devServer) {
          throw new Error("webpack-dev-server is not defined");
        }
        return middlewares;
      },
    },
  },
};
