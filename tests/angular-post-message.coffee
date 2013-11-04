describe("ngPostMessage",->
  postMessage = null
  $rootScope = null
  messages = null
  beforeEach(module('ngPostMessage'))
  beforeEach(inject((_$rootScope_,_postMessage_)->
    $rootScope = _$rootScope_
    postMessage = _postMessage_
    messages = ["foo", "bar"]
  ))

  it("has no messages",->
    expect(postMessage.messages[0]).toBeUndefined()
  )

  it("stores message into array",->
    msg = "hello world"
    m = postMessage.messages(msg)
    
    expect(m[0]).toEqual(msg)
  )

  describe("lastMessage()",->
    it("returns the last posted message",->
      postMessage.messages('hello world')
      expect(postMessage.lastMessage()).toEqual("hello world")
    )
  )

  it "should broadcast an outgoing message", ->
    outgoingMessageListener = jasmine.createSpy("listener")
    $rootScope.$on "outgoingMessage", outgoingMessageListener
    postMessage.post messages[0]
    expect(outgoingMessageListener).toHaveBeenCalled()

  it "should broadcast the correct outgoing message", ->
    outgoingMessageListener = jasmine.createSpy("listener")
    $rootScope.$on "outgoingMessage", outgoingMessageListener
    postMessage.post messages[0]
    expect(outgoingMessageListener.mostRecentCall.args[1]).toEqual messages[0]
  
)

