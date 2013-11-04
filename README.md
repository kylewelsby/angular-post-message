# Angular Post Message API

Allow angularJS to listen and publish cross-document messages though [`window.postMessage`](http://www.whatwg.org/specs/web-apps/current-work/multipage/web-messaging.html#crossDocumentMessages) API.

Cross-document messaging is compatable with the following browsers as seen on [Can I Use](http://caniuse.com/x-doc-messaging):

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


Tested on AngularJS versions `1.0.X` and `1.2.0`.

## Installation

The repository comes with the modules pre-buolt and compressed into the `dist/` directory.

Install the component via [bower](http://bower.io)

    bower install angular-post-message

Or alternatively checkout this repo into your project. 

Then inlcude `dist/angular-post-message.min.js` into your project.

## Development

You do not need to build the project to use it, but if you are working on it then this is what you need to know.

### Requirements

* [Node.js](http://node.js)
* [Testem][testem] - `npm install -g testem`


### Testing

To run all the tests

    npm test
    
To run tests while developing

    testem
    
Then open [http://localhost:7357](http://localhost:7357) in any or all browsers.

[testem]:https://github.com/airportyh/testem