'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 300;
  var lastTimeout;
  window.debounce = function (someFunction) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(someFunction, DEBOUNCE_INTERVAL);
  };
})();
