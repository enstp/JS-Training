class Grid extends Array {
    constructor(rows) {
        super(rows);
        PES.Utils.mixin(this.prototype, new PES.EventTarget());
    }

    get width() { 
        if(this.length > 0 && Array.isArray(this[0])){
            return this[0].length;
        }

        return 0;
    }

    get height() { 
        return this.length; 
    }

    init(columns, cellWidth) {
        this.cellWidth = cellWidth;
        for (let i = 0; i < this.height; ++i) {
            this[i] = this._buildRow(i, columns);
        }

        this.addListener(
            "moveLeft",
            cell => {
                
            })
    }

    reset() {
        this.forEach(rows => rows.forEach(cell => cell.setState(PES.Constants.cellStates.free)));
    }

    purgeLastRow(container) {
        this.removeFromContainer(container);

        this.pop();
        let newRow = this._buildRow(0, this.width);
        this.unshift(newRow);

        this._refresh();

        this.appendToContainer(container);
    }

    swapLayout() {
        this.forEach(rows => rows.forEach(cell => cell.swapColor()));
        this.forEach(rows => rows.forEach(cell => cell.setState(cell.getState())));
    }

    appendToContainer(container) {
        this.forEach(rows => rows.forEach(cell => container.appendChild(cell.getHtml())));
    }

    removeFromContainer(container) {
        this.forEach(rows => rows.forEach(cell => container.removeChild(cell.getHtml())));
    }

    isColumnOccupied(columnIndex) {
        for(let rowInd = 0; rowInd < this.height; ++rowInd) {
            if(this[rowInd][columnIndex].getState() === PES.Constants.cellStates.free) {
                return false;
            }
        }

        return true;
    }

    isRowOccupied(rowIndex) {
        for(let colIndex = 0; colIndex < this.width; ++colIndex) {
            if(this[rowIndex][colIndex].getState() === PES.Constants.cellStates.free) {
                return false;
            }
        }
        
        return true;
    }

    isOccupied() {
        for(let i = 0; i < this.width; ++i ){
            if(!this.isColumnOccupied(i)) {
                return false;
            }
        }

        return true;
    }

    display() {
        console.log(this._toString());
    } 

    _buildRow(rowIndex, rowWidth) {
        let row = new Array(rowWidth);
        for (let j = 0; j < row.length; j++) {    
            row[j] = this._buildCell(rowIndex, j, PES.Constants.cellStates.free);
        }

        return row;
    }

    _buildCell(i, j, state) {
        let cell = new Cell(i, j);
        cell.buildCellHtml(this.cellWidth);
        cell.setState(state);
        return cell;
    }

    _refresh() {
        for (let i = 0; i < this.height; ++i) {
            for (let j = 0; j < this.width; ++j) {
                let state = this[i][j].getState()
                this[i][j] = this._buildCell(i, j, state);
            }
        }
    }

    _toString() {
        let arrayStr = '';
        for (let i = 0; i < this.height; ++i) {
            for (let j = 0; j < this.width; ++j) {
                arrayStr += this[j][i] + ' ';
            }
            arrayStr += '\n';
        }

        return arrayStr;
    }
}