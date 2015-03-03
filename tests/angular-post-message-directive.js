(function() {
  describe("ngPostMessage directive", function() {
    var $scope, elm, messages, postMessage;
    elm = null;
    postMessage = null;
    $scope = null;
    messages = null;
    beforeEach(module('ngPostMessage'));
    beforeEach(inject(function($rootScope, $compile, _$postMessage_) {
      var frame, html;
      $scope = $rootScope;
      $scope.sender = jasmine.createSpyObj('sender', ['postMessage']);
      messages = ["foo", "{\"message\":\"foo\"}", "connect"];
      postMessage = _$postMessage_;
      spyOn(postMessage, 'messages').and.callThrough();
      frame = document.createElement('iframe');
      html = '<html><head><script>setInterval(function(){window.parent.postMessage(JSON.stringify({"ping":"ping"}),"*")}, 1000)</script></head><body></body></html>';
      document.querySelector('#jasmine_content').appendChild(frame);
      frame.contentDocument.open();
      frame.contentDocument.write(html);
      frame.contentDocument.close();
      elm = $compile(document.querySelector('html'))($scope);
      $scope.$digest();
    }));
    afterEach(function() {
      document.querySelector('#jasmine_content').innerHTML = '';
    });

    it('posts the message to parent window', function(done) {
      inject(function($window) {
        var domain, message, spy;
        spy = jasmine.createSpy('message');
        var listener = function(e) {
          expect(JSON.parse(e.data)).toEqual({
            ping: "ping"
          });
          expect(e.source.toString()).toEqual('[object Window]');
          if (done) {
            done();
          }
          $window.parent.removeEventListener('message', listener, false);
        };

        $window.parent.addEventListener('message', listener, false);
        delete $scope.sender;
        message = {
          "ping": "ping"
        };
        domain = "*";
        $scope.$broadcast('$messageOutgoing', JSON.stringify(message), domain);
      });
    });
  });

}).call(this);
