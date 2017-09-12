'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/kekstagram';

  var someFunction = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(xhr.response);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Превышено время ожидания от сервера. Максимальное время: ' + xhr.timeout / 1000 + 'с');
    });

    xhr.timeout = 5000;

    return xhr;
  };

  window.backend = {
    save: function (data, onLoad, onError) {
      var xhr = someFunction(onLoad, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },
    load: function (onLoad, onError) {
      var xhr = someFunction(onLoad, onError);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    }
  };
})();
