'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KeyListener = function () {
    function KeyListener(eventTarget, handler) {
        _classCallCheck(this, KeyListener);

        this.eventTarget = eventTarget;
        this.handler = handler;

        this._listen = this._listen.bind(this);
    }

    _createClass(KeyListener, [{
        key: 'start',
        value: function start() {
            this.eventTarget.addEventListener('keydown', this._listen);
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.eventTarget.removeEventListener('keydown', this._listen);
        }
    }, {
        key: '_listen',
        value: function _listen(keyEvent) {
            this.handler(keyEvent.keyCode);
        }
    }]);

    return KeyListener;
}();