'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = function () {
   function Cell(x, y, width) {
      _classCallCheck(this, Cell);

      this._x = x;
      this._y = y;
      this._cellDiv = this._buildCellHtml(width);
      this._cellState = PES.Constants.cellStates.free;
      this._cellFreeColor = PES.Constants.cellColors.free;
      this._cellOccupiedColor = PES.Constants.cellColors.occupied;
   }

   _createClass(Cell, [{
      key: '_buildCellHtml',
      value: function _buildCellHtml(size) {
         var elem = document.createElement('div');
         elem.classList += 'cell';
         elem.style.width = size + 'px';
         elem.style.height = size + 'px';
         return elem;
      }
   }, {
      key: 'swapColor',
      value: function swapColor() {
         var swapColor = this._cellFreeColor;
         this._cellFreeColor = this._cellOccupiedColor;
         this._cellOccupiedColor = swapColor;
      }
   }, {
      key: '_mark',
      value: function _mark() {
         this.HTML.style.backgroundColor = this._cellOccupiedColor;
      }
   }, {
      key: '_unmark',
      value: function _unmark() {
         this.HTML.style.backgroundColor = this._cellFreeColor;
      }
   }, {
      key: 'x',
      get: function get() {
         return this._x;
      }
   }, {
      key: 'y',
      get: function get() {
         return this._y;
      }
   }, {
      key: 'HTML',
      get: function get() {
         return this._cellDiv;
      }
   }, {
      key: 'state',
      get: function get() {
         return this._cellState;
      },
      set: function set(value) {
         this._cellState = value;
         if (this.state === PES.Constants.cellStates.free) {
            this._unmark();
         } else if (this.state === PES.Constants.cellStates.occupied) {
            this._mark();
         }
      }
   }]);

   return Cell;
}();