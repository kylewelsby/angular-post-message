module.exports = function(config) {
  require('./karma.conf.js')(config);
  config.singleRun = true;
  config.files = [
    'bower_components/angular-1.4/angular.js',
    'src/*.js',
    'bower_components/angular-mocks-1.4/angular-mocks.js',
    'tests/_helper.js',
    'tests/*.js'
  ];
};
