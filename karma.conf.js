process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = (config) => {
  config.set({
    files: ['test/karmaTests.ts'],

    preprocessors: {
      'test/karmaTests.ts': ['webpack', 'sourcemap']
    },

    frameworks: ['jasmine'],

    browsers: ['ChromeHeadless'],

    concurrency: 1,

    client: {
      jasmine: {
        timeoutInterval: 25000
      }
    },

    browserNoActivityTimeout: 40000,

    webpack: {
      devtool: 'inline-source-map',

      resolve: {
        extensions: ['.json', '.js', '.ts']
      },

      plugins: [],

      module: {
        rules: [
          {
            test: /\.ts$/,
            loader: 'babel-loader',
            exclude: /node_modules/
          }
        ]
      }
    },

    webpackMiddleware: {
      stats: 'errors-only'
    }
  })
}
