class GoL {
    constructor(config){
        this._configOptions(config);
        this._setup();
    }

    // #region Properties

    get isLiving() { return this.speedTimeot != null; }

    get shapeCollection() {
        return {        
            'Glider' : [
                new Cell(46, 21),
                new Cell(47, 22),
                new Cell(47, 23),
                new Cell(46, 23),
                new Cell(45, 23)
            ],
            'Small Exploder': [
                new Cell(45, 22),
                new Cell(45, 23),
                new Cell(46, 21),
                new Cell(46, 22),
                new Cell(46, 24),
                new Cell(47, 22),
                new Cell(47, 23)
            ],
            'Exploder': [
                new Cell(45, 21),
                new Cell(45, 22),
                new Cell(45, 23),
                new Cell(45, 24),
                new Cell(45, 25),
                new Cell(47, 21),
                new Cell(47, 25),
                new Cell(49, 21),
                new Cell(49, 22),
                new Cell(49, 23),
                new Cell(49, 24),
                new Cell(49, 25)
            ],
            '10 Cell Row': [
                new Cell(45, 21),
                new Cell(46, 21),
                new Cell(47, 21),
                new Cell(48, 21),
                new Cell(49, 21),
                new Cell(50, 21),
                new Cell(51, 21),
                new Cell(52, 21),
                new Cell(53, 21),
                new Cell(54, 21)
            ],
            'Lightweight spaceship': [
                new Cell(45, 22),
                new Cell(45, 24),
                new Cell(46, 21),
                new Cell(47, 21),
                new Cell(48, 21),
                new Cell(48, 24),
                new Cell(49, 21),
                new Cell(49, 22),
                new Cell(49, 23)
            ],
            'Tumbler': [
                new Cell(45, 24),
                new Cell(45, 25),
                new Cell(45, 26),
                new Cell(46, 21),
                new Cell(46, 22),
                new Cell(46, 26),
                new Cell(47, 21),
                new Cell(47, 22),
                new Cell(47, 23),
                new Cell(47, 24),
                new Cell(47, 25),
                new Cell(49, 21),
                new Cell(49, 22),
                new Cell(49, 23),
                new Cell(49, 24),
                new Cell(49, 25),
                new Cell(50, 21),
                new Cell(50, 22),
                new Cell(50, 26),
                new Cell(51, 24),
                new Cell(51, 25),
                new Cell(51, 26)
            ],
            'Gosper Glider Gun': [
                new Cell(45, 23),
                new Cell(45, 24),
                new Cell(46, 23),
                new Cell(46, 24),
                new Cell(53, 24),
                new Cell(53, 25),
                new Cell(54, 23),
                new Cell(54, 25),
                new Cell(55, 23),
                new Cell(55, 24),
                new Cell(61, 25),
                new Cell(61, 26),
                new Cell(61, 27),
                new Cell(62, 25),
                new Cell(63, 26),
                new Cell(67, 22),
                new Cell(67, 23),
                new Cell(68, 21),
                new Cell(68, 23),
                new Cell(69, 21),
                new Cell(69, 22),
                new Cell(69, 33),
                new Cell(69, 34),
                new Cell(70, 33),
                new Cell(70, 35),
                new Cell(71, 33),
                new Cell(79, 21),
                new Cell(79, 22),
                new Cell(80, 21),
                new Cell(80, 22),
                new Cell(80, 28),
                new Cell(80, 29),
                new Cell(80, 30),
                new Cell(81, 28),
                new Cell(82, 29)
            ]
        }
    }

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
        this.shape = this._generateNextShape();
        this.matrix = new Matrix(this.matrix.width, this.matrix.height, this.shape);
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
        
        this.matrix = new Matrix(rows, cols, this.shape);
        this.model.render(this.matrix, this.options.cellSize);
    }

    changeShape(shapesEl) {
        this.shape = this.shapeCollection[shapesEl.value] || [];
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
        this.shape =  this.shapeCollection['Glider'];

        let rows = Math.round(this.options.size.width / this.options.cellSize);
        let cols = Math.round(this.options.size.height / this.options.cellSize);
        this.matrix = new Matrix(rows, cols, this.shape);
        this.matrix.display();
        
        // Create GoL Model by configured style
        let container = document.querySelector(this.options.containerSelector);
        this.model = this._retrieveModel(container);

        // Dispatch the render method to the appropiate Model Object
        this.model.render(this.matrix, this.options.cellSize);

        // Capture events
        this._handleClick = this._handleClick.bind(this);

        // Register Events
        container.addEventListener('click', this._handleClick);
    }

    _retrieveModel(container) {
        switch(this.options.style) {
            case 'canvas':
                return new Canvas(container, this.options.size);
            case 'font':
                return new Font(container, this.options.size);
        } 
    }

    _handleClick(e) {
        let cellContext = this.model.getClickedCell(e);
        this._updateShape(cellContext);

        let rows = Math.round(this.options.size.width / this.options.cellSize);
        let cols = Math.round(this.options.size.height / this.options.cellSize);

        this.matrix = new Matrix(rows, cols, this.shape);
        this.model.render(this.matrix, this.options.cellSize);
    }

    _updateShape(cellContext) {
        let cell = cellContext.cell;
        let cellState = cellContext.state;

        if (cellState.toBorn) {
            this.shape.push(cell);
        }
        else if (cellState.toDie) {
            this.shape.forEach((c, ind) => {
                if (c.equals(cell)) {
                    cellIndex = ind;
                }
            });
            this.shape.splice(cellIndex, 1);
        }
    }
   
    _setIntervalAndExecute(callback, timeout) {
        callback();
        return setInterval(callback, timeout);
    }

    // #endregion

    // #region Algoritm Methods

    _generateNextShape() {
        var newShape = [];

        var neighbours = this._retrieveFlattenNeighbours(this.shape);
        this._markAlreadyAliveNeighbours(this.shape, neighbours);

        // construct the new shape
        neighbours.forEach((neighbour, _) =>{
            if (neighbour.occurences == 3 ||                                     // if this cell is neighbour for 3 cells => should be borned
                (neighbour.isAlreadyAlive && neighbour.occurences == 2)) {       // if this cell is already alive and is neighbour for 2 cells => should stay alive
                newShape.push(neighbour.cell);
            }
        });

        return newShape;
    }

    _retrieveFlattenNeighbours(shape) {
        var neighbours = [];
        shape.forEach((cell, _) => {
            var x = cell.getX(),
                y = cell.getY();
            
            this._checkNeighbour(neighbours, new Cell(x - 1, y - 1));
            this._checkNeighbour(neighbours, new Cell(x, y - 1));
            this._checkNeighbour(neighbours, new Cell(x + 1, y - 1));
            this._checkNeighbour(neighbours, new Cell(x - 1, y));
            this._checkNeighbour(neighbours, new Cell(x + 1, y));
            this._checkNeighbour(neighbours, new Cell(x - 1, y + 1));
            this._checkNeighbour(neighbours, new Cell(x, y + 1));
            this._checkNeighbour(neighbours, new Cell(x + 1, y + 1));
        });

        return neighbours;
    }

    _markAlreadyAliveNeighbours(shape, neighbours) {
        shape.forEach(cell =>{
            let foundNeighbour = this._findNeighbourInCollection(neighbours, cell);
            if (foundNeighbour)
                foundNeighbour.isAlreadyAlive = true;
        });
    }

    _checkNeighbour(neighbours, neighbour){
        var foundNeighbour = this._findNeighbourInCollection(neighbours, neighbour);
        if(!foundNeighbour) {
            neighbours.push( { cell: neighbour, occurences: 1 });
        } else {
            foundNeighbour.occurences++;
        }
    }

    _findNeighbourInCollection(neighbours, neighbour) {
        return neighbours.find((nb, _) => nb.cell.equals(neighbour));
    }

    // #endregion
}

 // Cell (Square) Object
 function Cell(x, y) {
    this.getX = () => x;
    this.getY = () => y;
 }

Object.assign(Cell.prototype, {
    equals: function(cell){
        return this.getX() === cell.getX() &&
               this.getY() === cell.getY();
    }
 });