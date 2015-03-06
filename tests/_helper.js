beforeEach(function() {
  var elm = document.querySelector('#jasmine_content');
  if (elm) {
    elm.innerHTML = '';
  } else {
    elm = document.createElement('div');
    elm.id = 'jasmine_content';
    document.body.appendChild(elm);
  }
});

afterEach(function() {
  var elm = document.querySelector('#jasmine_content');
  if (elm) {
    elm.innerHTML = '';
  }
});
