var PES = PES || {};

PES.Tetris = class {
    constructor(config) {
        this._configOptions(config);
        let containers = Array.from(document.querySelectorAll(this.options.containerSelector));
        containers.forEach(container => 
            new PES.Tetris.PlayGround(
                container,
                this.options.rows,
                this.options.columns,
                this.options.cellWidth,
                this.options.speed
            ).startGame());
    }

    _configOptions(config) {
        this.options = {
            containerSelector: '.tetris',
            speed: 1, // secondsTimeout
            rows: 50,
            columns: 80,
            cellWidth: 10, // in px
          };
 
        if(config) {
            Object.assign(this.options, this.options, config);
        }
    }
}


PES.Tetris.PlayGround = class {
    constructor(container, rows, columns, cellWidth, speed) {
        // Assign instance variables
        this.rows = rows;
        this.columns = columns;
        this.cellWidth = cellWidth;
        this.speed = speed;

        this.container = container;
        this.timer = null;
        this.restlessCell = null;

        // Capture events
        this._changeSpeed = this._changeSpeed.bind(this);
        this._resumeGame = this._resumeGame.bind(this);
        this._pauseGame = this._pauseGame.bind(this);
        this._changeLayout = this._changeLayout.bind(this);
        
        // Register Events
        this.container.addEventListener('focus', this._onContainerFocus);
        this.container.addEventListener('focusout', this._onContainerFocusOut);
        
        // Prepare the Game
        this._setupPlayGround();
        
        // Init Dependencies
        this.timer = new Timer(() => this._movePiece(PES.Constants.allowedMoves.down));
        this.keylistener = new KeyListener(this.container, nextMove => this._movePiece(nextMove));
    }

    startGame() {
        this.grid.reset();
        this._addPieceToGame();

        this.timer.start(this.speed);
        this.keylistener.start();
        this._toggleControls(true);
        this.container.focus();

        let overlayedDiv = this.container.getElementsByClassName('overlay')[0];
        overlayedDiv.style.display = 'none';
    }

    _resumeGame() {
        let overlayedDiv = this.container.getElementsByClassName('overlay')[0];
        if(overlayedDiv.style.display === 'table') {
            overlayedDiv.style.display = 'none';
            this.grid.reset();
        }

        this.timer.start(this.speed);
        this.keylistener.start();
        this._toggleControls(true);
        this.container.focus();

        let startButton = this.container.querySelector('#start');
        startButton.innerHTML = 'Start';
    }

    _pauseGame() {
        this.timer.stop();
        this.keylistener.stop();
        this._toggleControls(false);

        let startButton = this.container.querySelector('#start');
        startButton.innerHTML = 'Resume';
    }

    finishGame(success) {
        this.timer.stop();
        this.keylistener.stop();
        this._toggleControls(false);

        // Create game over text
        let overlayedDiv = this.container.getElementsByClassName('overlay')[0];
        overlayedDiv.style.display = 'table';

        let gameSuccessLabel = overlayedDiv.getElementsByClassName('game-success')[0];
        gameSuccessLabel.style.display = success ? 'table-cell' : 'none';
        let gameOverLabel = overlayedDiv.getElementsByClassName('game-over')[0]
        gameOverLabel.style.display = success ? 'none' : 'table-cell';
    }

    _changeSpeed(e) {
        let rangeVal = parseInt(e.currentTarget.value);
        this.speed = 1 / rangeVal;

        this._pauseGame();
        this._resumeGame();
    }

    _changeLayout(e) {
        e.currentTarget.blur();
        this.grid.swapLayout();
    }

    _setupPlayGround() {
        this.grid = new Grid(this.rows);
        this.grid.init(this.columns, this.cellWidth);

        var fragment = document.createDocumentFragment();

        let gridDiv = this._createGrid();
        this.grid.appendToContainer(gridDiv);
        let controlsDiv = this._createControls();

        fragment.appendChild(gridDiv);
        fragment.appendChild(controlsDiv);
        this.container.appendChild(fragment);
        
        this.container.setAttribute('tabindex', '0');
        this.container.style.height = `${gridDiv.offsetHeight + controlsDiv.offsetHeight + 15}px`;
    }

    _createGrid() {
        let gridHeight = `${this.columns * this.cellWidth}px`;
        let gridWidth =  `${this.rows * this.cellWidth}px`;

        let gridDiv = document.createElement('div');
        gridDiv.classList += 'tetris-grid';
        gridDiv.style.width = gridHeight;
        gridDiv.style.height = gridWidth;

        // Create overlay element
        let overlayedDiv = document.createElement('div');
        overlayedDiv.classList += 'overlay';
        overlayedDiv.style.width = gridHeight;
        overlayedDiv.style.height = gridWidth;

        // Create game status labels
        let successGameStatusSpan = document.createElement('span');
        successGameStatusSpan.classList += 'game-status game-success';
        successGameStatusSpan.innerHTML = "Congrats!";
        successGameStatusSpan.style.color = 'green';
        overlayedDiv.appendChild(successGameStatusSpan);
        let failGameStatusSpan = document.createElement('span');
        failGameStatusSpan.classList += 'game-status game-over';
        failGameStatusSpan.innerHTML = "Your're out!";
        overlayedDiv.appendChild(failGameStatusSpan);
        
        gridDiv.appendChild(overlayedDiv);
        return gridDiv;
    }

    _createControls() {
        let controlsDiv = document.createElement('div');
        controlsDiv.classList += 'tetris-controls text-center';

        // Start Button
        let startBtn = document.createElement('button');
        startBtn.id = 'start';
        startBtn.type = 'button';
        startBtn.innerHTML = 'Start';
        startBtn.classList += 'btn btn-primary';
        startBtn.addEventListener('click', this._resumeGame);
        controlsDiv.appendChild(startBtn);

        // Pause Button
        let pauseBtn = document.createElement('button');
        pauseBtn.id = 'pause';
        pauseBtn.type = 'button';
        pauseBtn.innerHTML = 'Pause';
        pauseBtn.classList += 'btn btn-success';
        pauseBtn.addEventListener('click', this._pauseGame);
        controlsDiv.appendChild(pauseBtn);

        // Speed Dial
        let speedDialContainer = document.createElement('div');

        let speedDialLabel = document.createElement('label');
        speedDialLabel.innerHTML = 'Speed';
        speedDialLabel.htmlFor = 'speed-dial';
        speedDialContainer.appendChild(speedDialLabel);
        
        let speedDial = document.createElement('input');
        speedDial.id = 'speed-dial'
        speedDial.type = 'range';
        speedDial.classList += 'custom-range';
        speedDial.min = '1';
        speedDial.max = '100';
        speedDial.title = 'Speed dial';
        speedDial.attributes['aria-label'] = 'Speed dial';
        speedDial.addEventListener('change', this._changeSpeed);
        speedDialContainer.appendChild(speedDial);

        // Layout Customization
        let layoutSelect = document.createElement('select');
        layoutSelect.id = 'layout';
        layoutSelect.classList += 'custom-select';
        layoutSelect.addEventListener('change', this._changeLayout);
        let darkLayoutOption = document.createElement('option');
        darkLayoutOption.innerHTML = 'white';
        let whiteLayoutOption = document.createElement('option');
        whiteLayoutOption.innerHTML = 'dark';
        layoutSelect.appendChild(darkLayoutOption);
        layoutSelect.appendChild(whiteLayoutOption);
        speedDialContainer.appendChild(layoutSelect);

        controlsDiv.appendChild(speedDialContainer);
        return controlsDiv;
    }

    _toggleControls(forStart) {
        let startButton = this.container.querySelector('#start');
        let pauseButton = this.container.querySelector('#pause');
        let speedDial = this.container.querySelector('#speed-dial');
        
        if(forStart) {
            startButton.setAttribute('disabled', 'disabled');
            pauseButton.removeAttribute('disabled');
            speedDial.removeAttribute('disabled');
        } else {
            startButton.removeAttribute('disabled');
            pauseButton.setAttribute('disabled', 'disabled');
            speedDial.setAttribute('disabled', 'disabled');
        }
    }

    _onContainerFocus(e) {
        e.currentTarget.style.boxShadow = '10px 20px 30px blue';
    }

    _onContainerFocusOut(e) {
        e.currentTarget.style.boxShadow = '';
    }

    // #region Game Logic

    _addPieceToGame() {
        let defaultX = 0;
        let defaultY = Math.floor(this.columns / 2);
        
        this.restlessCell = this.grid[defaultX][defaultY];
        this.restlessCell.setState(PES.Constants.cellStates.occupied);
    }

    _movePiece(direction) {
        if(this.grid.isColumnOccupied(this.restlessCell.getY())) {
            let gridIsFull = this.grid.isOccupied();
            this.finishGame(gridIsFull);
        } else if(this._validateNextMove(direction)) {
            let nextCell = this._retrieveNextCell(direction);
            let nextCellOccupied = nextCell.getState() === PES.Constants.cellStates.occupied;
            if(nextCellOccupied) {
                this._addPieceToGame(); // add a new Piece to the game
            } else {
                this.restlessCell.setState(PES.Constants.cellStates.free);
                this.restlessCell = nextCell;
                this.restlessCell.setState(PES.Constants.cellStates.occupied);
            }
        } else if (direction === PES.Constants.allowedMoves.down) {
            this._addPieceToGame(); // add a new Piece to the game
        }
        
    }

    _retrieveNextCell(direction) {
        let restlessCellX = this.restlessCell.getX();
        let restlessCellY = this.restlessCell.getY();

        return this._runAccordingDirection(
            direction,
            () => this.grid[restlessCellX][restlessCellY - 1],
            () => this.grid[restlessCellX][restlessCellY + 1],
            () => this.grid[restlessCellX + 1][restlessCellY]);
    }

    _validateNextMove(direction) {
        let restlessCellX = this.restlessCell.getX();
        let restlessCellY = this.restlessCell.getY();

        return this._runAccordingDirection(
            direction,
            () => restlessCellY > 0,
            () => restlessCellY < this.grid.width,
            () => restlessCellX < this.grid.height - 1);
    }

    _runAccordingDirection(direction, leftCalback, rightCalback, downCalback) {
        switch(direction) {
            case PES.Constants.allowedMoves.left:
                return leftCalback();
            case PES.Constants.allowedMoves.right:
                return rightCalback();
            case PES.Constants.allowedMoves.down:
                return downCalback();
        }
    }

    // #endregion
}