// Karma configuration
// Generated on Tue Mar 03 2015 15:54:13 GMT+0800 (MYT)

var customLaunchers = {
  sl_ie_11: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    version: 11,
    platform: 'Windows 8.1'
  },
  sl_ie_10: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    version: 10,
    platform: 'Windows 8'
  },
  sl_ie_9: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    version: 9,
    platform: 'Windows 7'
  },
  sl_chrome: {
    base: 'SauceLabs',
    browserName: 'chrome'
  },
  sl_firefox: {
    base: 'SauceLabs',
    browserName: 'firefox'
  },
  sl_opera: {
    base: 'SauceLabs',
    browserName: 'opera'
  }
};

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'bower_components/angular-1.4/angular.js',
      'src/*.js',
      'bower_components/angular-mocks-1.4/angular-mocks.js',
      'tests/_helper.js',
      'tests/*.js'
    ],


    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage', 'saucelabs'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    sauceLabs: {
      testName: 'Angular postMessage'
    },
    customLaunchers: customLaunchers,

    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcovonly', subdir: '.', file: 'lcov.info' },
      ]
    }
  });

  if (process.env.CI) {
    console.log('CI Mode:', Object.keys(customLaunchers).join(', '));
    config.browsers = Object.keys(customLaunchers);
  }

};
