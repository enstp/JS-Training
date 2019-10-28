class Font extends ContentModel {
    constructor(container, dimension) {
        super(container, dimension, 'X', '0')

        // Create the canvas and inject it into the container
        let elem = document.createElement('div');
        elem.style.fontFamily = 'Courier New';
        this.appendToContainer(elem);
    }

    render(matrix, cellSize) {
        let content = '';
        let letterSpacing = parseFloat(this.element.style.letterSpacing);
        this.element.style.letterSpacing = `${letterSpacing + cellSize / 10}em`;
        this.element.innerHTML = '';

        let isAlive;
        let cellContent;
        for (let i = 0; i < matrix.height; ++i) {
            let contentRow = '';
            for (let j = 0; j < matrix.width; ++j) {
                isAlive = matrix[j][i] == 1;
                cellContent = isAlive ? this.aliveSymbol : this.deathSymbol;
                contentRow += `${cellContent} `;
            }
            content += `${contentRow}</br>`;
        }

        this.element.innerHTML = content;
    }
}
