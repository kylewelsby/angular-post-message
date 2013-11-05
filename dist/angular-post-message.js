/*!
* angular-post-message v1.1.0
* Copyright 2013 Kyle Welsby <kyle@mekyle.com>
* Licensed under The MIT License
*/
(function() {
  var app;

  app = angular.module("ngPostMessage", ['ng']);

  app.directive('html', [
    '$window', '$postMessage', function($window, $postMessage) {
      return {
        restrict: 'E',
        controller: [
          '$scope', function($scope) {
            return $scope.$on('$messageOutgoing', function(event, message) {
              var sender;
              sender = $scope.sender || $window.parent;
              return sender.postMessage(message, "*");
            });
          }
        ],
        link: (function($scope, $element, $attrs) {
          $scope.sendMessageToService = (function(event) {
            var error, response;
            event = event.originalEvent || event;
            if (event && event.data) {
              response = null;
              $scope.sender = event.source;
              try {
                response = angular.fromJson(e.data);
              } catch (_error) {
                error = _error;
                response = event.data;
              }
              $scope.$root.$broadcast('$messageIncoming', response);
              return $postMessage.messages(response);
            }
          });
          return angular.element($window).bind('message', $scope.sendMessageToService);
        })
      };
    }
  ]);

  app.factory("$postMessage", [
    '$rootScope', function($rootScope) {
      var $messages, api;
      $messages = [];
      api = {
        messages: (function(_message_) {
          if (_message_) {
            $messages.push(_message_);
            $rootScope.$digest();
          }
          return $messages;
        }),
        lastMessage: (function() {
          return $messages[$messages.length - 1];
        }),
        post: (function(message) {
          return $rootScope.$broadcast('$messageOutgoing', message);
        })
      };
      return api;
    }
  ]);

}).call(this);
