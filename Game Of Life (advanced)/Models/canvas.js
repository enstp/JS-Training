class Canvas extends ContentModel{
    constructor(container, dimension) {
        super(container, dimension, '#1f1f21', '#d1eefc')

        // Create the canvas and inject it into the container
        let elem = document.createElement('canvas')
        this.appendToContainer(elem);
    }

    render(matrix, cellSize) {
        this.matrix = matrix;
        this.cellSize = cellSize;
        let ctx = this.element.getContext("2d");
        ctx.clearRect(0, 0, this.dimension.width, this.dimension.height);

        let isAlive;
        this.matrix.forEach((rowVal, rowInd) => {
            rowVal.forEach((colVal, colInd) => {
                isAlive = colVal == 1;
                ctx.fillStyle = isAlive ? this.aliveSymbol : this.deathSymbol;
                ctx.fillRect(rowInd * cellSize + 1, colInd * cellSize + 1, cellSize - 1, cellSize - 1);
            });
        });
    }

    getClickedCell(e) {
        let ctx = this.element.getContext("2d");
        let rect = ctx.canvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var imageData = ctx.getImageData(x, y, 1, 1).data;
        var left = Math.floor(rect.left + window.pageXOffset);
        var top = Math.floor(rect.top + window.pageYOffset);
        var cellX = Math.floor((e.clientX - left + window.pageXOffset) / this.cellSize);
        var cellY = Math.floor((e.clientY - top + window.pageYOffset - 5) / this.cellSize);
        var cellColor = `#${this._rgbToHex(imageData[0], imageData[1], imageData[2])}`;
        return {
            cell: new Cell(cellX, cellY),
            state: {
                toBorn: cellColor === this.deathSymbol,
                toDie: cellColor === this.aliveSymbol
            }
        };
    }

    _rgbToHex(r, g, b) {
        let ensuringNotExcededUpperBound = color => color <= 255 ? color : 255;
        r = ensuringNotExcededUpperBound(r);
        g = ensuringNotExcededUpperBound(g);
        b = ensuringNotExcededUpperBound(b);
        return ((r << 16) | (g << 8) | b).toString(16);
    }
}
