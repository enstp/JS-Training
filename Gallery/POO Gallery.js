var PES = PES || {};

PES.Gallery = class {
    constructor(container, images, width, height, slideTime) {
        this.container = container;
        this.images = images;
        this.width = width;
        this.height = height;
        
        this.slideIndex = 1;
        this.animationTimeout = slideTime;
        this.timeout = null;

        this.moveToNext = this.moveToNext.bind(this);
        this.moveToPrevious = this.moveToPrevious.bind(this);
    }

    generate() {
        // inject Html elements
        this.constructHtml();
        this.container.style.width = `${this.width}px`;
        this.container.style.height = `${this.height}px`;
        this.container.style.display = `table`;
        this.container.style.position = `relative`;

        // Set the default carousel item to be first image
        this.moveToNext(this.slideIndex);
    }

    constructHtml() {
        // Add the list of images into the container element
        var gallery = document.createElement("ul");
        this.images.forEach((img, ind) => {
            var imageWrapperElem = document.createElement("li"); 
            imageWrapperElem.className = "fade";  
            var imageElem = document.createElement("img"); 
            imageElem.setAttribute("src", img);
            imageElem.style.maxWidth = `${this.width}px`;
            imageElem.style.maxHeight = `${this.height - 25}px`;
            imageWrapperElem.appendChild(imageElem);

            gallery.appendChild(imageWrapperElem);
         });
        this.container.appendChild(gallery);

        // Add the prev button
        var prevElem = document.createElement("a");
        prevElem.innerHTML = '&#10094;';
        prevElem.className = "prev";
        prevElem.addEventListener("click", this.moveToPrevious, false);     
        this.container.appendChild(prevElem);

        // Add the next button
        var nextElem = document.createElement("a");
        nextElem.innerHTML = '&#10095;';
        nextElem.className = "next";
        nextElem.addEventListener("click", this.moveToNext , false);     
        this.container.appendChild(nextElem);

        // Add the dot elements
        var dotsContainer = document.createElement("div"); 
        dotsContainer.className = "dots-container"; 
        dotsContainer.style.left = `${(this.width - (16 * this.images.length)) / 2}px`;
        this.images.forEach((img, ind) => {
            var dotElem = document.createElement("span"); 
            dotElem.className = "dot"; 
            dotElem.addEventListener("click", this.setCurrentSlide.bind(this, ind + 1), false);     
            dotsContainer.appendChild(dotElem);
         });
        this.container.appendChild(dotsContainer);
    }

    moveToNext() {
        this.setCurrentSlide(this.slideIndex + 1);
    }

    moveToPrevious() {
        this.setCurrentSlide(this.slideIndex - 1);
    }

    setCurrentSlide(slideNo) {
        this.moveToSlide(slideNo);
    }

    moveToSlide(n) {
        clearTimeout(this.timeout);

        var i;

        var slides = this.container.getElementsByTagName("li");
        var dots = this.container.getElementsByClassName("dot");

        if (n > slides.length) // come back to the first
            this.slideIndex = 1;
        else if (n < 1) // go to the last
            this.slideIndex = slides.length;
        else
            this.slideIndex = n;

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }

        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        slides[this.slideIndex - 1].style.display = "block"; 
        dots[this.slideIndex - 1].className += " active"; 

        // Change image every 2 seconds
        this.timeout = setTimeout(() => this.setCurrentSlide(this.slideIndex + 1), this.animationTimeout); 
    }
}