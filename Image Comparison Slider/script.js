
var PES = PES || {};

PES.ImageComparaisonSlider = class {
    constructor(config){
        this._configOptions(config);

        this.container = document.querySelector(this.options.containerSelector);
        this.documentRoot = document.getElementsByTagName('html')[0]; 

        // Capture events
        this._draggedHandleMouseDown = this._draggedHandleMouseDown.bind(this);
        this._documentMouseUp = this._documentMouseUp.bind(this);
        this._documentMouseMove = this._documentMouseMove.bind(this);
    }

    generate() {
        this.container.style.width = `${this.options.width}px`;
        this.container.style.height = `${this.options.height}px`;
   
        // Add the list of images into the container element
        let afterImg = document.createElement("img");
        afterImg.src = this.options.images[1];
        this.container.appendChild(afterImg);

        this.resizeDiv = document.createElement("div");
        this.resizeDiv.classList.add("resize");

        var beforeImg = document.createElement("img");
        beforeImg.src = this.options.images[0];
        this.resizeDiv.appendChild(beforeImg);

        this.container.appendChild(this.resizeDiv);

        this.draggedHandle = document.createElement("span");
        this.draggedHandle.classList.add("handle");
        this.draggedHandle.addEventListener('mousedown', this._draggedHandleMouseDown);
        this.container.appendChild(this.draggedHandle);
    }

    _configOptions(config) {
        this.options = {
            containerSelector: '#slider-container',
            images: [
                "Images/left.jpg", 
                "Images/right.jpg"
            ],
            width: 600,
            height: 400
          };
 
        if(config) {
            Object.assign(this.options, this.options, config);
        }
    }

    _draggedHandleMouseDown(e){
        this.draggedHandle.classList.add('draggable'); 
        this.draggedHandle.classList.add('handle-colored'); 
        this.documentRoot.classList.add('draggable'); 

        this.documentRoot.addEventListener('mousemove', this._documentMouseMove);
        this.documentRoot.addEventListener('mouseup', this._documentMouseUp);
    }

    _documentMouseUp(e){
        this.draggedHandle.classList.remove('draggable');
        this.draggedHandle.classList.remove('handle-colored');
        this.documentRoot.classList.remove('draggable'); 
        console.log("mouse up");
        
        this.documentRoot.removeEventListener('mousemove', this._documentMouseMove);
        this.documentRoot.removeEventListener('mouseup', this._documentMouseUp);
    }

    _documentMouseMove(e) {
        // get current coordinates inside the container
        let mouseLeftPos = e.clientX - this.container.offsetLeft;

        this.resizeDiv.style.width = `${mouseLeftPos}px`;
        this.draggedHandle.style.left = `${mouseLeftPos}px`;

        console.log(`clientX: ${e.clientX}px - container offset: ${this.container.offsetLeft}px = ${mouseLeftPos}px`);
    }
}