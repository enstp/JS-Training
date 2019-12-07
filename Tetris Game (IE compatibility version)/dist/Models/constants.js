"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _arrayFrom = Array.from || function () {
  var isCallable = function isCallable(fn) {
    return typeof fn === 'function';
  };

  var toInteger = function toInteger(value) {
    var number = Number(value);

    if (isNaN(number)) {
      return 0;
    }

    if (number === 0 || !isFinite(number)) {
      return number;
    }

    return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
  };

  var maxSafeInteger = Math.pow(2, 53) - 1;

  var toLength = function toLength(value) {
    var len = toInteger(value);
    return Math.min(Math.max(len, 0), maxSafeInteger);
  };

  var iteratorProp = function iteratorProp(value) {
    if (value != null) {
      if (['string', 'number', 'boolean', 'symbol'].indexOf(_typeof(value)) > -1) {
        return Symbol.iterator;
      } else if (typeof Symbol !== 'undefined' && 'iterator' in Symbol && Symbol.iterator in value) {
        return Symbol.iterator;
      } else if ('@@iterator' in value) {
        return '@@iterator';
      }
    }
  };

  var getMethod = function getMethod(O, P) {
    if (O != null && P != null) {
      var func = O[P];

      if (func == null) {
        return void 0;
      }

      if (!isCallable(func)) {
        throw new TypeError(func + " is not a function");
      }

      return func;
    }
  };

  var iteratorStep = function iteratorStep(iterator) {
    var result = iterator.next();
    var done = Boolean(result.done);

    if (done) {
      return false;
    }

    return result;
  };

  return function from(items) {
    "use strict";

    var C = this;
    var mapFn = arguments.length > 1 ? arguments[1] : void 0;
    var T;

    if (typeof mapFn !== 'undefined') {
      if (!isCallable(mapFn)) {
        throw new TypeError('Array.from: when provided, the second argument must be a function');
      }

      if (arguments.length > 2) {
        T = arguments[2];
      }
    }

    var A, k;
    var usingIterator = getMethod(items, iteratorProp(items));

    if (usingIterator !== void 0) {
      A = isCallable(C) ? Object(new C()) : [];
      var iterator = usingIterator.call(items);

      if (iterator == null) {
        throw new TypeError("Array.from requires an array-like or iterable object");
      }

      k = 0;
      var next, nextValue;

      while (true) {
        next = iteratorStep(iterator);

        if (!next) {
          A.length = k;
          return A;
        }

        nextValue = next.value;

        if (mapFn) {
          A[k] = mapFn.call(T, nextValue, k);
        } else {
          A[k] = nextValue;
        }

        k++;
      }
    } else {
      var arrayLike = Object(items);

      if (items == null) {
        throw new TypeError("Array.from requires an array-like object - not null or undefined");
      }

      var len = toLength(arrayLike.length);
      A = isCallable(C) ? Object(new C(len)) : new Array(len);
      k = 0;
      var kValue;

      while (k < len) {
        kValue = arrayLike[k];

        if (mapFn) {
          A[k] = mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }

        k++;
      }

      A.length = len;
    }

    return A;
  };
}();

var PES = PES || {};
PES.Constants = {
  allowedMoves: {
    left: 1,
    right: 2,
    down: 3
  },
  cellStates: {
    free: 0,
    occupied: 1
  },
  cellColors: {
    free: '#ecf0f1',
    occupied: 'black'
  }
};