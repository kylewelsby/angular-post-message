app = angular.module("ngPostMessage",['ng'])

app.directive('html',['$window','$postMessage',($window,$postMessage)->
  {
    restrict: 'E'
    controller: (['$scope',($scope)->
      $scope.$on('outgoingMessage',(event,message)->
        if $scope.sender
          $scope.sender.postMessage(message,"*")
      )
    ])
    link: (($scope,$element,$attrs)->
      $scope.sendMessageToService = ((event)->
        event = event.originalEvent || event
        if event and event.data
          response = null
          $scope.sender = event.source
          try
            response = angular.fromJson(e.data)
          catch error
            response = event.data
          $postMessage.messages(response)
      )

      angular.element($window).bind('message',$scope.sendMessageToService)
    )
  }
])

app.factory("$postMessage",['$rootScope',($rootScope)->
  $messages = []
  api = {
    messages: ((_message_)->
      if _message_
        $messages.push(_message_)
        $rootScope.$digest()
      $messages
    )
    lastMessage: (->
      $messages[$messages.length - 1]
    )
    post: ((message)->
      $rootScope.$broadcast('outgoingMessage',message)
    )
  }
  api
])

