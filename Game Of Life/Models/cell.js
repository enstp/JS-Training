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