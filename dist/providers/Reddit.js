'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Reddit (https://reddit.com) provider.
 */

var Reddit = function () {
  function Reddit() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.location.href;
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.title;

    _classCallCheck(this, Reddit);

    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
  }

  _createClass(Reddit, [{
    key: 'shareWindow',
    value: function shareWindow() {
      var share_elements = document.querySelectorAll('[data-social=reddit]');
      var share_url = 'https://reddit.com/submit?url=' + this.url + '&title=' + this.title;

      [].concat(_toConsumableArray(share_elements)).forEach(function (item) {
        item.addEventListener('click', function (event) {
          event.preventDefault();
          return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
        });
      });
    }
  }, {
    key: 'getCounter',
    value: function getCounter() {
      var script = document.createElement('script');
      var callback = ('goodshare_' + Math.random()).replace('.', '');
      var count_elements = document.querySelectorAll('[data-counter=reddit]');
      var count_url = 'https://www.reddit.com/api/info.json?url=' + this.url + '&jsonp=' + callback;

      if (count_elements.length > 0) {
        window[callback] = function (counter) {
          [].concat(_toConsumableArray(count_elements)).forEach(function (item) {
            if (counter.data.children.length > 0) {
              var total_count = 0;

              for (var i = 0; i < counter.data.children.length; i++) {
                total_count += counter.data.children[i].data.score;
              }

              item.innerHTML = total_count;
            } else {
              item.innerHTML = 0;
            }
          });

          script.parentNode.removeChild(script);
        };

        script.src = count_url;
        document.body.appendChild(script);
      }
    }
  }]);

  return Reddit;
}();

var reddit_share = exports.reddit_share = new Reddit().shareWindow();
var reddit_counter = exports.reddit_counter = new Reddit().getCounter();