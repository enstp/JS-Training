class Grid extends Array {
    constructor(rows) {
        super(rows);
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
        for (let i = 0; i < this.height; ++i) {
            this[i] = new Array(columns);

            for (let j = 0; j < columns; j++) {    
                let cell = new Cell(i, j);
                cell.buildCellHtml(cellWidth);
                cell.setState(PES.Constants.cellStates.free);
                this[i][j] = cell;
            }
        }
    }

    reset() {
        this.forEach(rows => rows.forEach(cell => cell.setState(PES.Constants.cellStates.free)));
    }

    swapLayout() {
        this.forEach(rows => rows.forEach(cell => cell.swapColor()));
        this.forEach(rows => rows.forEach(cell => cell.setState(cell.getState())));
    }

    appendToContainer(container) {
        this.forEach(rows => rows.forEach(cell => container.appendChild(cell.getHtml())));
    }

    isColumnOccupied(columnIndex) {
        for(let rowInd = 0; rowInd < this.height; ++rowInd) {
            if(this[rowInd][columnIndex].getState() === PES.Constants.cellStates.free) {
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