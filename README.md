[![][bower_badge]][repo]
[![][travisci_img]][travisci]
[![][codeclimate_badge]][codeclimate]
[![][codeclimate_cov_badge]][codeclimate]


# AngularJS postMessage API

Allow angularJS to listen and publish cross-document messages though [`window.postMessage`](http://www.whatwg.org/specs/web-apps/current-work/multipage/web-messaging.html#crossDocumentMessages) API.

Cross-document messaging is compatible with the following browsers as seen on [Can I Use](http://caniuse.com/x-doc-messaging):

- Internet Explorer 8+
- Firefox 3+
- Chrome 4+
- Safari 4+
- Opera 9.5+
- iOS Safari 3.2+
- Opera Mini 5+
- Android Browser 2.1+
- Blackberry Browser 7+
- Opera Moble 10+
- Chrome for Android 30+
- Firefox for Android 25+
- Internet Exploer Mobile 10+

*Partial support in IE8-9 refers to only working in frames/iframes (not other tabs/windows). Also in IE 9 and below an object cannot be sent using postMessage. Partial support in IE10 refers to [limitations in certain conditions](http://stackoverflow.com/questions/16226924/is-cross-origin-postmessage-broken-in-ie10)*


Tested on AngularJS versions `1.2`, `1.3` and `1.4` in Chrome, Firefox, Opera, and IE9+.

*IE8 is not officially supported by AngularJS*

## Installation

The repository comes with the modules pre-built and compressed into the `dist/` directory.

Install the component via [bower](http://bower.io)

    bower install angular-post-message

Or alternatively checkout this repo into your project.

Then include `dist/angular-post-message.min.js` into your project.

## Example

This is a simple example which uses postMessage to deliver messages between two origins.
There is a [gist](https://gist.github.com/kylewelsby/585b3a5395c6731acc50) which will deliver a message every second

#### index.html

    <html>
      <head>
        <script src="bower_components/angular/angular.js"></script>
        <script src="bower_components/angular-post-message/angular-post-message.js"></script>
      </head>
      <body>
        <iframe src="https://rawgit.com/kylewelsby/585b3a5395c6731acc50/raw/f661e856adbccf39549ed7c550661f09158f8d55/index.html"></iframe>
        <br>
        <button ng-click="sendMessage();">Send response</button>
        <br>
        <ol>
          <li ng-repeat="message in messages">{{message}}</li>
        </ol>
      </body>
    </html>

#### app.js

    var app = angular.module('app',['ngPostMessage']);
    app.controller('MainCtrl', function($scope) {
      $scope.messages = [];
      $scope.$root.$on('$messageIncoming', function (event, data){
        $scope.messages.push(angular.fromJson(data));
      });
      $scope.sendMessage = function (){
        $scope.$emit(
          '$messageOutgoing',
          angular.toJson({"response":"hi"})
        );
      };
    });

## Development

You do not need to build the project to use it, but if you are working on it then this is what you need to know.

### Requirements

* [Node.js](http://node.js)


### Testing

To run all the tests

    npm test

To run tests while developing (limited to latest Angular version on Google Chrome)

    karma start

or run tests once

    ./scripts/ci

[repo]:https://github.com/kylewelsby/angular-post-message
[travisci]:https://travis-ci.org/kylewelsby/angular-post-message
[travisci_img]:https://travis-ci.org/kylewelsby/angular-post-message.svg
[codeclimate]:https://codeclimate.com/github/kylewelsby/angular-post-message
[codeclimate_badge]:https://codeclimate.com/github/kylewelsby/angular-post-message/badges/gpa.svg
[codeclimate_cov_badge]:https://codeclimate.com/github/kylewelsby/angular-post-message/badges/coverage.svg
[bower_badge]:https://img.shields.io/bower/v/angular-post-message.svg