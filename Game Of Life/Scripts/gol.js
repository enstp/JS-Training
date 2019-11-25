class GoL {
    constructor(config){
        this._configOptions(config);
        this._setup();
    }

    // #region Properties

    get isLiving() { return this.speedTimeot != null; }

    // #endregion

    // #region Public Methods

    start() {
        let timeoutMs = this.options.speed * 1000;
        this.speedTimeot = this._setIntervalAndExecute(this.moveNext.bind(this), timeoutMs);
    }

    stop() {
        clearInterval(this.speedTimeot);
        this.speedTimeot = null;
    }

    moveNext() {
        this.matrix = this._generateNextGeneration(this.matrix);
        this.model.render(this.matrix, this.options.cellSize);
    }

    changeSpeed(rangeEl){
        let rangeVal = parseInt(rangeEl.value);
        this.options.speed = 1 / rangeVal;

        if(this.isLiving) {
            this.stop();
            this.start();
        }
    }

    changeSize(rangeEl) {
        this.options.cellSize = parseInt(rangeEl.value);
        let rows = Math.round(this.options.size.width / this.options.cellSize);
        let cols = Math.round(this.options.size.height / this.options.cellSize);
        
        this.matrix = this._generateNextGeneration(this.matrix, rows, cols);
        this.model.render(this.matrix, this.options.cellSize);
    }

    changeShape(shapesEl) {
        this.shape = Constants.shapeCollection[shapesEl.value] || [];
        this.matrix = new Matrix(this.matrix.width, this.matrix.height, this.shape);
        this.model.render(this.matrix, this.options.cellSize);
    }

    // #endregion

    // #region Private Methods

    _configOptions(config) {
        this.options = {
            containerSelector: '#gol-container',
            style: 'canvas',
            cellSize: 20,
            speed: 1,

            size: {
                width: 1860,
                height: 930
            }
          };
 
        if(config) {
            Object.assign(this.options, config);
        }
    }

    _setup() {
        // Capture Events
        this.speedTimeot = null;

        // Set the default shape (that never dies)
        this.shape =  Constants.shapeCollection['Glider'];

        let rows = Math.round(this.options.size.width / this.options.cellSize);
        let cols = Math.round(this.options.size.height / this.options.cellSize);
        this.matrix = new Matrix(rows, cols, this.shape);
        this.matrix.display();
        
        // Create GoL Model by configured style
        let container = document.querySelector(this.options.containerSelector);
        this.model = Factory.createGolModel(this.options.style, container, this.options.size);

        // Dispatch the render method to the appropiate Model Object
        this.model.render(this.matrix, this.options.cellSize);

        // Capture events
        this._handleClick = this._handleClick.bind(this);

        // Register Events
        container.addEventListener('click', this._handleClick);
    }

    _handleClick(e) {
        let cellContext = this.model.getClickedCell(e);
        
        let cellState = cellContext.state;
        let rowInd = cellContext.cell.getX();
        let colInd = cellContext.cell.getY();

        if(cellState.toBorn) {
            this.matrix[rowInd][colInd] = 1;
        } else if (cellState.toDie) {
            this.matrix[rowInd][colInd] = 0;
        }

        this.model.render(this.matrix, this.options.cellSize);
    }

    _setIntervalAndExecute(callback, timeout) {
        callback();
        return setInterval(callback, timeout);
    }

    // #endregion

    // #region Algoritm Methods

    _generateNextGeneration(oldMatrix, width, height) {
        width = width || oldMatrix.width;
        height = height || oldMatrix.height;

        let newMatrix = new Matrix(width, height);
        for(let i = 0; i < newMatrix.width; ++i){
            for(let j = 0; j < newMatrix.height; ++j){
                let cellIsAlive = this._getMatrixValueOrDefault(oldMatrix, i, j) === 1;
                let occurences = 
                    this._getMatrixValueOrDefault(oldMatrix, i - 1, j - 1) +
                    this._getMatrixValueOrDefault(oldMatrix, i, j - 1) +
                    this._getMatrixValueOrDefault(oldMatrix, i + 1, j - 1) +
                    this._getMatrixValueOrDefault(oldMatrix, i - 1, j) +
                    this._getMatrixValueOrDefault(oldMatrix, i + 1, j) +
                    this._getMatrixValueOrDefault(oldMatrix, i - 1, j + 1) +
                    this._getMatrixValueOrDefault(oldMatrix, i, j + 1) +
                    this._getMatrixValueOrDefault(oldMatrix, i + 1, j + 1);

                if(occurences == 3 ||                   // if this cell has at least 3 cells => should be borned or stay alive
                  (occurences === 2 && cellIsAlive)) {  // if this cell is already alive and is neighbour for 2 cells => should stay alive               
                    newMatrix[i][j] = 1;
                  } else {
                    newMatrix[i][j] = 0;                // day or stay dead
                  }
            }
        }

        return newMatrix;
    }

    // If the i / j indexes are lower / higher than matrix bound, simply return 0
    _getMatrixValueOrDefault(matrix, i, j) {       
        try {
            return matrix[i][j] || 0;
        } catch { 
            return 0;
        }
    }

    // #endregion
}