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

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PES = PES || {};

PES.Tetris =
/*#__PURE__*/
function () {
  function _class(config) {
    var _this = this;

    _classCallCheck(this, _class);

    this._configOptions(config);

    var containers = _arrayFrom(document.querySelectorAll(this.options.containerSelector));

    containers.forEach(function (container) {
      return new PES.Tetris.PlayGround(container, _this.options.rows, _this.options.columns, _this.options.cellWidth, _this.options.speed).startGame();
    });
  }

  _createClass(_class, [{
    key: "_configOptions",
    value: function _configOptions(config) {
      this.options = {
        containerSelector: '.tetris',
        speed: 1,
        // secondsTimeout
        rows: 50,
        columns: 80,
        cellWidth: 10 // in px

      };

      if (config) {
        _extends(this.options, config);
      }
    }
  }]);

  return _class;
}();

PES.Tetris.PlayGround =
/*#__PURE__*/
function () {
  function _class2(container, rows, columns, cellWidth, speed) {
    var _this2 = this;

    _classCallCheck(this, _class2);

    // Assign instance variables
    this.rows = rows;
    this.columns = columns;
    this.cellWidth = cellWidth;
    this.speed = speed;
    this.container = container; // Capture events

    this._onChangeSpeed = this._onChangeSpeed.bind(this);
    this._resumeGame = this._resumeGame.bind(this);
    this._pauseGame = this._pauseGame.bind(this);
    this._onChangeLayout = this._onChangeLayout.bind(this); // Register Events

    this.container.addEventListener('focus', this._onContainerFocus);
    this.container.addEventListener('focusout', this._onContainerFocusOut); // Prepare the Game

    this._game = new PES.Tetris.Game(this.rows, this.columns, this.cellWidth);

    this._setupPlayGround(); // Init Dependencies


    this._timer = new Timer(function () {
      return _this2._tryMovePiece(40);
    });
    this._keylistener = new KeyListener(this.container, function (keyCode) {
      return _this2._tryMovePiece(keyCode);
    });
  }

  _createClass(_class2, [{
    key: "startGame",
    value: function startGame() {
      this._game.start();

      this._timer.start(this.speed);

      this._keylistener.start();

      this._toggleControls(true);

      this.container.focus();
      var overlayedDiv = this.container.getElementsByClassName('overlay')[0];
      overlayedDiv.style.display = 'none';
    }
  }, {
    key: "_finishGame",
    value: function _finishGame() {
      this._timer.stop();

      this._keylistener.stop();

      this._toggleControls(false); // Create game over text


      var overlayedDiv = this.container.getElementsByClassName('overlay')[0];
      overlayedDiv.style.display = 'table';
      var gameOverLabel = overlayedDiv.getElementsByClassName('game-over')[0];
      gameOverLabel.style.display = 'table-cell';
    }
  }, {
    key: "_setupPlayGround",
    value: function _setupPlayGround() {
      var fragment = document.createDocumentFragment();

      var gridDiv = this._createGrid();

      this._game.appendToContainer(gridDiv);

      var controlsDiv = this._createControls();

      fragment.appendChild(gridDiv);
      fragment.appendChild(controlsDiv);
      this.container.appendChild(fragment);
      this.container.setAttribute('tabindex', '0');
    }
  }, {
    key: "_createGrid",
    value: function _createGrid() {
      var gridHeight = "".concat(this.columns * this.cellWidth, "px");
      var gridWidth = "".concat(this.rows * this.cellWidth, "px");
      var gridDiv = document.createElement('div');
      gridDiv.classList.add('tetris-grid');
      gridDiv.style.width = gridHeight;
      gridDiv.style.height = gridWidth; // Create overlay element

      var overlayedDiv = document.createElement('div');
      overlayedDiv.classList.add('overlay');
      overlayedDiv.style.width = gridHeight;
      overlayedDiv.style.height = gridWidth; // Create game status labels

      var failGameStatusSpan = document.createElement('span');
      failGameStatusSpan.classList.add('game-status');
      failGameStatusSpan.classList.add('game-over');
      failGameStatusSpan.innerHTML = "Game over!";
      overlayedDiv.appendChild(failGameStatusSpan);
      gridDiv.appendChild(overlayedDiv);
      return gridDiv;
    }
  }, {
    key: "_createControls",
    value: function _createControls() {
      var controlsDiv = document.createElement('div');
      controlsDiv.classList.add('tetris-controls');
      controlsDiv.classList.add('text-center'); // Start Button

      var startBtn = document.createElement('button');
      startBtn.id = 'start';
      startBtn.type = 'button';
      startBtn.innerHTML = 'Start';
      startBtn.classList.add('btn');
      startBtn.classList.add('btn-primary');
      startBtn.addEventListener('click', this._resumeGame);
      controlsDiv.appendChild(startBtn); // Pause Button

      var pauseBtn = document.createElement('button');
      pauseBtn.id = 'pause';
      pauseBtn.type = 'button';
      pauseBtn.innerHTML = 'Pause';
      pauseBtn.classList.add('btn');
      pauseBtn.classList.add('btn-success');
      pauseBtn.addEventListener('click', this._pauseGame);
      controlsDiv.appendChild(pauseBtn); // Speed Dial

      var speedDialContainer = document.createElement('div');
      var speedDialLabel = document.createElement('label');
      speedDialLabel.innerHTML = 'Speed';
      speedDialLabel.htmlFor = 'speed-dial';
      speedDialContainer.appendChild(speedDialLabel);
      var speedDial = document.createElement('input');
      speedDial.id = 'speed-dial';
      speedDial.type = 'range';
      speedDial.classList.add('custom-range');
      speedDial.min = '1';
      speedDial.max = '100';
      speedDial.title = 'Speed dial';
      speedDial.value = 1 / this.speed;
      speedDial.attributes['aria-label'] = 'Speed dial';
      speedDial.addEventListener('change', this._onChangeSpeed);
      speedDialContainer.appendChild(speedDial); // Layout Customization

      var layoutSelect = document.createElement('select');
      layoutSelect.id = 'layout';
      layoutSelect.classList.add('custom-select');
      layoutSelect.addEventListener('change', this._onChangeLayout);
      var darkLayoutOption = document.createElement('option');
      darkLayoutOption.innerHTML = 'white';
      var whiteLayoutOption = document.createElement('option');
      whiteLayoutOption.innerHTML = 'dark';
      layoutSelect.appendChild(darkLayoutOption);
      layoutSelect.appendChild(whiteLayoutOption);
      speedDialContainer.appendChild(layoutSelect);
      controlsDiv.appendChild(speedDialContainer);
      return controlsDiv;
    }
  }, {
    key: "_toggleControls",
    value: function _toggleControls(forStart) {
      var startButton = this.container.querySelector('#start');
      var pauseButton = this.container.querySelector('#pause');
      var speedDial = this.container.querySelector('#speed-dial');

      if (forStart) {
        startButton.setAttribute('disabled', 'disabled');
        pauseButton.removeAttribute('disabled');
        speedDial.removeAttribute('disabled');
      } else {
        startButton.removeAttribute('disabled');
        pauseButton.setAttribute('disabled', 'disabled');
        speedDial.setAttribute('disabled', 'disabled');
      }
    }
  }, {
    key: "_tryMovePiece",
    value: function _tryMovePiece(keyCode) {
      if (!this._game.canProceed) {
        this._finishGame();
      } else {
        var gridContainer = this.container.querySelector('.tetris-grid');

        switch (keyCode) {
          case 37:
            this._game.fire({
              type: 'moveLeft'
            });

            break;

          case 39:
            this._game.fire({
              type: 'moveRight'
            });

            break;

          case 40:
            this._game.fire({
              type: 'moveDown',
              data: gridContainer
            });

            break;
        }
      }
    } // #region Event Handlers

  }, {
    key: "_onContainerFocus",
    value: function _onContainerFocus(e) {
      e.currentTarget.style.boxShadow = '10px 20px 30px blue';
    }
  }, {
    key: "_onContainerFocusOut",
    value: function _onContainerFocusOut(e) {
      e.currentTarget.style.boxShadow = '';
    }
  }, {
    key: "_resumeGame",
    value: function _resumeGame() {
      var overlayedDiv = this.container.getElementsByClassName('overlay')[0];

      if (overlayedDiv.style.display === 'table') {
        overlayedDiv.style.display = 'none';

        this._game.reset();
      }

      this._timer.start(this.speed);

      this._keylistener.start();

      this._toggleControls(true);

      this.container.focus();
      var startButton = this.container.querySelector('#start');
      startButton.innerHTML = 'Start';
    }
  }, {
    key: "_pauseGame",
    value: function _pauseGame() {
      this._timer.stop();

      this._keylistener.stop();

      this._toggleControls(false);

      var startButton = this.container.querySelector('#start');
      startButton.innerHTML = 'Resume';
    }
  }, {
    key: "_onChangeSpeed",
    value: function _onChangeSpeed(e) {
      var rangeVal = parseInt(e.currentTarget.value);
      this.speed = 1 / rangeVal;

      this._pauseGame();

      this._resumeGame();
    }
  }, {
    key: "_onChangeLayout",
    value: function _onChangeLayout(e) {
      e.currentTarget.blur();

      this._game.swapLayout();
    } // #endregion

  }]);

  return _class2;
}();

PES.Tetris.Game =
/*#__PURE__*/
function () {
  function _class3(rows, columns, cellWidth) {
    _classCallCheck(this, _class3);

    // Init Grid
    this._grid = new Grid(rows, columns, cellWidth); // Init Events

    Utils.mixin(Object.getPrototypeOf(this), EventTarget.prototype);
    this.addListener("moveLeft", this._moveCellLeft);
    this.addListener("moveRight", this._moveCellRight);
    this.addListener("moveDown", this._moveCellDown);
  }

  _createClass(_class3, [{
    key: "start",
    value: function start() {
      this.reset();

      this._addPieceToGame();
    }
  }, {
    key: "reset",
    value: function reset() {
      this._grid.forEach(function (rows) {
        return rows.forEach(function (cell) {
          return cell.state = PES.Constants.cellStates.free;
        });
      });
    }
  }, {
    key: "appendToContainer",
    value: function appendToContainer(container) {
      this._grid.forEach(function (rows) {
        return rows.forEach(function (cell) {
          return container.appendChild(cell.HTML);
        });
      });
    }
  }, {
    key: "removeFromContainer",
    value: function removeFromContainer(container) {
      this._grid.forEach(function (rows) {
        return rows.forEach(function (cell) {
          return container.removeChild(cell.HTML);
        });
      });
    }
  }, {
    key: "swapLayout",
    value: function swapLayout() {
      this._grid.forEach(function (rows) {
        return rows.forEach(function (cell) {
          return cell.swapColor();
        });
      });

      this._grid.forEach(function (rows) {
        return rows.forEach(function (cell) {
          return cell.state = cell.state;
        });
      });
    }
  }, {
    key: "_addPieceToGame",
    value: function _addPieceToGame() {
      var defaultX = 0;
      var defaultY = Math.floor(this._grid.width / 2);
      this.cell = this._grid[defaultX][defaultY];
      this.cell.state = PES.Constants.cellStates.occupied;
    }
  }, {
    key: "_purgeLastRow",
    value: function _purgeLastRow(gridContainer) {
      this.removeFromContainer(gridContainer);

      this._grid.popPush();

      this.appendToContainer(gridContainer);
    }
  }, {
    key: "_moveCell",
    value: function _moveCell(nextCell) {
      if (nextCell.state === PES.Constants.cellStates.free) {
        this.cell.state = PES.Constants.cellStates.free;
        this.cell = nextCell;
        this.cell.state = PES.Constants.cellStates.occupied;
      }
    }
  }, {
    key: "_moveCellLeft",
    value: function _moveCellLeft() {
      if (this.cell.y > 0) {
        var nextCell = this._grid[this.cell.x][this.cell.y - 1];

        this._moveCell(nextCell);
      }
    }
  }, {
    key: "_moveCellRight",
    value: function _moveCellRight() {
      if (this.cell.y < this._grid.width) {
        var nextCell = this._grid[this.cell.x][this.cell.y + 1];

        this._moveCell(nextCell);
      }
    }
  }, {
    key: "_moveCellDown",
    value: function _moveCellDown(eventArgs) {
      var gridContainer = eventArgs.data;

      if (this.cell.x < this._grid.height - 1) {
        var nextCell = this._grid[this.cell.x + 1][this.cell.y];

        if (nextCell.state === PES.Constants.cellStates.free) {
          this._moveCell(nextCell);
        } else {
          // add a new Piece to the game               
          this._addPieceToGame();
        }
      } else if (this._grid.isRowOccupied(this.cell.x)) {
        this._purgeLastRow(gridContainer);
      } else {
        // add a new Piece to the game
        this._addPieceToGame();
      }
    }
  }, {
    key: "canProceed",
    get: function get() {
      return !this._grid.isColumnOccupied(this.cell.y);
    }
  }]);

  return _class3;
}();