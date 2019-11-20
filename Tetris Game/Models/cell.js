 // Cell Object
 function Cell(x, y) {
   let cellDiv = '';
   let cellState = PES.Constants.cellStates.free;
   let cellFreeColor = PES.Constants.cellColors.free;
   let cellOccupiedColor = PES.Constants.cellColors.occupied;

   let mark = () => cellDiv.style.backgroundColor = cellOccupiedColor;
   let unmark = () => cellDiv.style.backgroundColor = cellFreeColor;

   this.getX = () => x;
   this.getY = () => y;

   this.getState = () => cellState;
   this.setState = value => {
      cellState = value;

      if(cellState === PES.Constants.cellStates.free) {
         unmark();
      } else if (cellState === PES.Constants.cellStates.occupied) {
         mark();
      }
   }

   this.buildCellHtml = size => {
      cellDiv = document.createElement('div');
      cellDiv.classList += `cell`;
      cellDiv.style.width = `${size}px`;
      cellDiv.style.height = `${size}px`;
   }

   this.swapColor = () => {
      let swapColor = cellFreeColor;
      cellFreeColor = cellOccupiedColor;
      cellOccupiedColor = swapColor;
   }
   
   this.getHtml = () => cellDiv;
}