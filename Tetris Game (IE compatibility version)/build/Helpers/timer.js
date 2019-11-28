"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timer = function () {
    function Timer(callback) {
        _classCallCheck(this, Timer);

        this.callback = callback;
    }

    _createClass(Timer, [{
        key: "start",
        value: function start(interval) {
            var intervalMs = interval * 1000;
            this.speedInterval = this._setIntervalAndExecute(this.callback, intervalMs);
        }
    }, {
        key: "stop",
        value: function stop() {
            clearInterval(this.speedInterval);
            this.speedInterval = null;
        }
    }, {
        key: "_setIntervalAndExecute",
        value: function _setIntervalAndExecute(callback, timeout) {
            callback();
            return setInterval(callback, timeout);
        }
    }]);

    return Timer;
}();