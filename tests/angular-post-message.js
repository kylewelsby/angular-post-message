(function() {
  'use strict';
  describe("ngPostMessage", function() {
    var $rootScope, messages, postMessage;
    postMessage = null;
    $rootScope = null;
    messages = null;
    beforeEach(module('ngPostMessage'));
    beforeEach(inject(function(_$rootScope_, _$postMessage_) {
      $rootScope = _$rootScope_;
      postMessage = _$postMessage_;
      messages = ["foo", "bar"];
    }));
    it("has no messages", function() {
      expect(postMessage.messages[0]).toBeUndefined();
    });
    it("stores message into array", function() {
      var m, msg;
      msg = "hello world";
      m = postMessage.messages(msg);
      expect(m[0]).toEqual(msg);
    });
    describe("lastMessage()", function() {
      it("returns the last posted message", function() {
        postMessage.messages('hello world');
        expect(postMessage.lastMessage()).toEqual("hello world");
      });
    });
    it("should broadcast an outgoing message", function() {
      var outgoingMessageListener;
      outgoingMessageListener = jasmine.createSpy("listener");
      $rootScope.$on("$messageOutgoing", outgoingMessageListener);
      postMessage.post(messages[0]);
      expect(outgoingMessageListener).toHaveBeenCalled();
    });

    it("should broadcast the correct outgoing message", function() {
      var outgoingMessageListener;
      outgoingMessageListener = jasmine.createSpy("listener");
      $rootScope.$on("$messageOutgoing", outgoingMessageListener);
      postMessage.post(messages[0]);
      expect(outgoingMessageListener.calls.first().args[1]).toEqual(messages[0]);
    });
  });

}).call(this);
