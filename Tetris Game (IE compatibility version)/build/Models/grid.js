'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
    function ExtendableBuiltin() {
        var instance = Reflect.construct(cls, Array.from(arguments));
        Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
        return instance;
    }

    ExtendableBuiltin.prototype = Object.create(cls.prototype, {
        constructor: {
            value: cls,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });

    if (Object.setPrototypeOf) {
        Object.setPrototypeOf(ExtendableBuiltin, cls);
    } else {
        ExtendableBuiltin.__proto__ = cls;
    }

    return ExtendableBuiltin;
}

var Grid = function (_extendableBuiltin2) {
    _inherits(Grid, _extendableBuiltin2);

    function Grid(rows, columns, cellWidth) {
        _classCallCheck(this, Grid);

        var _this = _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).call(this, rows));

        _this.cellWidth = cellWidth;
        _this._init(rows, columns, cellWidth);
        return _this;
    }

    _createClass(Grid, [{
        key: 'popPush',
        value: function popPush() {
            this.pop();
            var newRow = this._buildRow(0, this.width);
            this.unshift(newRow);
            this._refresh();
        }
    }, {
        key: 'removeFromContainer',
        value: function removeFromContainer(container) {
            this.forEach(function (rows) {
                return rows.forEach(function (cell) {
                    return container.removeChild(cell.HTML);
                });
            });
        }
    }, {
        key: 'isColumnOccupied',
        value: function isColumnOccupied(columnIndex) {
            for (var rowInd = 0; rowInd < this.height; ++rowInd) {
                if (this[rowInd][columnIndex].state === PES.Constants.cellStates.free) {
                    return false;
                }
            }

            return true;
        }
    }, {
        key: 'isRowOccupied',
        value: function isRowOccupied(rowIndex) {
            for (var colIndex = 0; colIndex < this.width; ++colIndex) {
                if (this[rowIndex][colIndex].state === PES.Constants.cellStates.free) {
                    return false;
                }
            }

            return true;
        }
    }, {
        key: 'display',
        value: function display() {
            console.log(this._toString());
        }
    }, {
        key: '_init',
        value: function _init(rows, columns, cellWidth) {
            for (var i = 0; i < rows; ++i) {
                this[i] = this._buildRow(i, columns);
            }
        }
    }, {
        key: '_buildRow',
        value: function _buildRow(rowIndex, rowWidth) {
            var row = new Array(rowWidth);
            for (var j = 0; j < row.length; j++) {
                row[j] = this._buildCell(rowIndex, j, PES.Constants.cellStates.free);
            }

            return row;
        }
    }, {
        key: '_buildCell',
        value: function _buildCell(i, j, state) {
            var cell = new Cell(i, j, this.cellWidth);
            cell.state = state;
            return cell;
        }
    }, {
        key: '_refresh',
        value: function _refresh() {
            for (var i = 0; i < this.height; ++i) {
                for (var j = 0; j < this.width; ++j) {
                    var state = this[i][j].state;
                    this[i][j] = this._buildCell(i, j, state);
                }
            }
        }
    }, {
        key: '_toString',
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
        key: 'width',
        get: function get() {
            if (this.length > 0 && Array.isArray(this[0])) {
                return this[0].length;
            }

            return 0;
        }
    }, {
        key: 'height',
        get: function get() {
            return this.length;
        }
    }]);

    return Grid;
}(_extendableBuiltin(Array));