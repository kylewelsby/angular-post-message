var angularVersion;
for(var i=0; i<process.argv.length;i++){
  if(process.argv[i].indexOf('--angular-version=') !== -1){
    angularVersion = process.argv[i].replace('--angular-version=','');
  }
}

console.log(module.exports);
var port;
for(var i=0; i<process.argv.length;i++){
  if(process.argv[i].indexOf('--port=') !== -1){
    port = process.argv[i].replace('--port=','');
  }
}

var angularVersions = [
  '1.0.8',
  '1.2.9',
  '1.3.11',
  '1.4.0'
];

var sauceLabsBrowsers = [
  // {name: 'internet explorer', version: 11, platform: 'Windows 8.1'},
  // {name: 'internet explorer', version: 10, platform: 'Windows 8'},
  // {name: 'internet explorer', version: 9, platform: 'Windows 7'},
  // {name: 'internet explorer', version: 8, platform: 'Windows XP'},
  {name: 'chrome'},
  {name: 'firefox'},
  {name: 'opera'},
  // {name: 'safari', version: 8, platform: 'OS X 10.10'},
  {name: 'safari', version: 7, platform: 'OS X 10.9'},
  {name: 'safari', version: 6, platform: 'OS X 10.8'},
  {name: 'iphone', version: '8.1', platform: 'OS X 10.10'},
  {name: 'iphone', version: '7.1', platform: 'OS X 10.10'},
  {name: 'iphone', version: '6.1', platform: 'OS X 10.8'},
  {name: 'android', version: '5.0'},
  {name: 'android', version: '4.4'},
  {name: 'android', version: '4.3'},
]

var config = {
  before_tests: './scripts/before_tests',
  on_exit: 'rm -r .tmp/ || echo "tried cleaning up but could not"',
  src_files: [
    'src/*.coffee',
    'tests/*.coffee'
  ],
  launch_in_ci: [],
  launch_in_dev: []
};


if(!angularVersion) {
  config.launchers = {};
  config.serve_files = [];
  angularVersions.forEach(function(version){
    var key = 'Angular ' + version
    config.launchers[key] = {
      command: 'testem ci --port=11'+version.replace(/\./g,'').slice(0,3)+' --file .testem.js -- --angular-version='+version,
      protocol: 'tap'
    }
    config.launch_in_ci.push(key);
  });
} else {
  if(!port) {
    throw new Error('Port is not defined');
  }
  config.launchers = {};
  sauceLabsBrowsers.forEach(function(browser){
    var key = ['SauceLabs', browser.name, browser.version].join(' ');
    var command = ['./node_modules/.bin/saucie', '--port="'+port+'"']
    command.push('--browserNameSL="'+browser.name+'"')
    if(browser.version){
      command.push('--versionSL="'+browser.version+'"')
    }
    if(browser.platform){
      command.push('--platformSL="'+browser.platform+'"')
    }
    config.launchers[key] = {
      command: command.join(' '),
      protocol: 'tap'
    };
    config.launch_in_ci.push(key);
    config.timeout: 2 * 60 * 1000;
  });
  config.serve_files= [
    'bower_components/angular-'+angularVersion+'/angular.js',
    '.tmp/src/*.js',
    'bower_components/angular-mocks-'+angularVersion+'/angular-mocks.js',
    '.tmp/tests/*.js'
  ]
}

module.exports = config;
