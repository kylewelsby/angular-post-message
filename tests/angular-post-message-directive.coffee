describe("ngPostMessage directive",->
  elm = null
  postMessage = null
  $scope = null
  messages = null
  beforeEach(module('ngPostMessage'))
  beforeEach(inject(($rootScope,$compile,_$postMessage_)->
    $scope = $rootScope
    $scope.sender = jasmine.createSpyObj('sender',['postMessage'])
    messages = ["foo", "{\"message\":\"foo\"}", "connect"]
    postMessage = _$postMessage_
    spyOn(postMessage,'messages').andCallThrough()
    elm = $compile(document.querySelector('html'))($scope)
    $scope.$digest()
  ))

  it('posts the message',->
    $scope.$broadcast('$messageOutgoing',"hello world")
    expect($scope.sender.postMessage).toHaveBeenCalled()
  )

  it('posts the message to parent window', inject(($window)->
    spyOn($window.parent,'postMessage')
    delete $scope.sender
    $scope.$broadcast('$messageOutgoing',"hello world")
    expect($window.parent.postMessage).toHaveBeenCalled()
  ))

  it "should JSON stringify the message on post", ->
    $scope.$broadcast "$messageOutgoing", messages[0], "*"
    expect($scope.sender.postMessage).toHaveBeenCalledWith messages[0], "*"

  it "should call messages() on postMessageService", ->
    $scope.sendMessageToService data: messages[1]
    expect(postMessage.messages).toHaveBeenCalled()

  it "should call messages() on postMessageService decoding JSON message", ->
    $scope.sendMessageToService data: messages[1]
    expect(postMessage.messages).toHaveBeenCalledWith angular.fromJson(messages[1])
  
)

