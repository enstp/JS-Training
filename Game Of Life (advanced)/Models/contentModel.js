class ContentModel {
    constructor(container, dimension, aliveSymbol, deathSymbol) {
        this.container = container;
        this.dimension = dimension;

        this.aliveSymbol = aliveSymbol;
        this.deathSymbol = deathSymbol;
    }

    appendToContainer(elem) {
        this.element = elem;
        this.element.width = this.dimension.width;
        this.element.height = this.dimension.height;
        this.container.appendChild(this.element);
    }
}