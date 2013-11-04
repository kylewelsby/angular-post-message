(function() {
  var app;

  app = angular.module("ngPostMessage", ['ng']);

  app.directive('html', [
    '$window', 'postMessage', function($window, postMessage) {
      return {
        restrict: 'E',
        controller: [
          '$scope', function($scope) {
            return $scope.$on('outgoingMessage', function(event, message) {
              if ($scope.sender) {
                return $scope.sender.postMessage(message, "*");
              }
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
              return postMessage.messages(response);
            }
          });
          return angular.element($window).bind('message', $scope.sendMessageToService);
        })
      };
    }
  ]);

  app.factory("postMessage", [
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
          return $rootScope.$broadcast('outgoingMessage', message);
        })
      };
      return api;
    }
  ]);

}).call(this);
