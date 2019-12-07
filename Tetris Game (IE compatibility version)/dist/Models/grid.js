"use strict";

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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Grid =
/*#__PURE__*/
function (_Array) {
  _inherits(Grid, _Array);

  function Grid(rows, columns, cellWidth) {
    var _this;

    _classCallCheck(this, Grid);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Grid).call(this, rows));
    _this.cellWidth = cellWidth;

    _this._init(rows, columns, cellWidth);

    return _this;
  }

  _createClass(Grid, [{
    key: "popPush",
    value: function popPush() {
      this.pop();

      var newRow = this._buildRow(0, this.width);

      this.unshift(newRow);

      this._refresh();
    }
  }, {
    key: "removeFromContainer",
    value: function removeFromContainer(container) {
      this.forEach(function (rows) {
        return rows.forEach(function (cell) {
          return container.removeChild(cell.HTML);
        });
      });
    }
  }, {
    key: "isColumnOccupied",
    value: function isColumnOccupied(columnIndex) {
      for (var rowInd = 0; rowInd < this.height; ++rowInd) {
        if (this[rowInd][columnIndex].state === PES.Constants.cellStates.free) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "isRowOccupied",
    value: function isRowOccupied(rowIndex) {
      for (var colIndex = 0; colIndex < this.width; ++colIndex) {
        if (this[rowIndex][colIndex].state === PES.Constants.cellStates.free) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "display",
    value: function display() {
      console.log(this._toString());
    }
  }, {
    key: "_init",
    value: function _init(rows, columns, cellWidth) {
      for (var i = 0; i < rows; ++i) {
        this[i] = this._buildRow(i, columns);
      }
    }
  }, {
    key: "_buildRow",
    value: function _buildRow(rowIndex, rowWidth) {
      var row = new Array(rowWidth);

      for (var j = 0; j < row.length; j++) {
        row[j] = this._buildCell(rowIndex, j, PES.Constants.cellStates.free);
      }

      return row;
    }
  }, {
    key: "_buildCell",
    value: function _buildCell(i, j, state) {
      var cell = new Cell(i, j, this.cellWidth);
      cell.state = state;
      return cell;
    }
  }, {
    key: "_refresh",
    value: function _refresh() {
      for (var i = 0; i < this.height; ++i) {
        for (var j = 0; j < this.width; ++j) {
          var state = this[i][j].state;
          this[i][j] = this._buildCell(i, j, state);
        }
      }
    }
  }, {
    key: "_toString",
    value: function _toString() {
      var arrayStr = '';

      for (var i = 0; i < this.height; ++i) {
        for (var j = 0; j < this.width; ++j) {
          arrayStr += this[j][i] + ' ';
        }

        arrayStr += '\n';
      }

      return arrayStr;
    }
  }, {
    key: "width",
    get: function get() {
      if (this.length > 0 && Array.isArray(this[0])) {
        return this[0].length;
      }

      return 0;
    }
  }, {
    key: "height",
    get: function get() {
      return this.length;
    }
  }]);

  return Grid;
}(_wrapNativeSuper(Array));