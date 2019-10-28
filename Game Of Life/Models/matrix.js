class Matrix extends Array {
    constructor(width, height, shape) {
        super(width);
        this._init(height);

        if(shape){
            this._fill(shape);
        }
    }

    get width() { 
        return this.length; 
    }

    get height() { 
        if(this.length > 0 && Array.isArray(this[0])){
            return this[0].length;
        }

        return 0;
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

    _init(height) {
        for (let i = 0; i < this.width; ++i) {
            this[i] = new Array(height);

            // Init the array with 0 (default) values
            this[i].fill(0);
        }
    }

    _fill(shape) {
        // Tranverse shape and fill with 1 values 
        shape.forEach(cell => {
            var x = cell.getX(), 
                y = cell.getY();

            if(this.width > x && this.height > y)
                this[x][y] = 1;
        });
    }
}