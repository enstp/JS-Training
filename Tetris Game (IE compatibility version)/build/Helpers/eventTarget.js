"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventTarget = function () {
    function EventTarget() {
        _classCallCheck(this, EventTarget);
    }

    _createClass(EventTarget, [{
        key: "addListener",
        value: function addListener(type, listener) {
            // create an array if it doesn't exist
            if (!this.hasOwnProperty("_listeners")) {
                this._listeners = [];
            }

            if (typeof this._listeners[type] == "undefined") {
                this._listeners[type] = [];
            }

            this._listeners[type].push(listener);
        }
    }, {
        key: "fire",
        value: function fire(event) {
            if (!event.target) {
                event.target = this;
            }

            if (!event.type) {
                // falsy
                throw new Error("Event object missing 'type' property.");
            }

            if (this._listeners && this._listeners[event.type] instanceof Array) {
                var listeners = this._listeners[event.type];
                for (var i = 0, len = listeners.length; i < len; i++) {
                    listeners[i].call(this, event);
                }
            }
        }
    }, {
        key: "removeListener",
        value: function removeListener(type, listener) {
            if (this._listeners && this._listeners[type] instanceof Array) {
                var listeners = this._listeners[type];
                for (var i = 0, len = listeners.length; i < len; i++) {
                    if (listeners[i] === listener) {
                        listeners.splice(i, 1);
                        break;
                    }
                }
            }
        }
    }]);

    return EventTarget;
}();

;