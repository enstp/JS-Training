
var PES = PES || {};

PES.StaticGallery = class {
    constructor(config){
        this._configOptions(config);
        this.container = document.querySelector(this.options.containerSelector);

        this._filterImages()
            .then(imageResults => {
                let validImages = imageResults.filter(imageResult => imageResult.status === 'fulfilled').map(imageResult => imageResult.value);
                this.options.images = validImages;
                
                let rejectedImages = imageResults.filter(imageResult => imageResult.status === 'rejected').map(imageResult => imageResult.reason);
                if(rejectedImages.length > 0) {
                    console.log(`The followind images have been rejected due to an invalid aspect ratio: ${rejectedImages}`)
                }

                this._generate();
            });

        // Capture events
        this._onImageWrapperChange = this._onImageWrapperChange.bind(this);
    }

    _generate() {
        this.container.style.width = `${this.options.width}px`;
        
        // Add the list of images within their wrappers, into the container element
        this.options.images.forEach((image, index) => {
            let imageWrapperElem = document.createElement("div");
            imageWrapperElem.classList.add('image-wrapper');
            imageWrapperElem.style.transition = `flex-grow ${this.options.transitionDuration}s linear`;
            
            let imageElem = document.createElement("img");
            imageElem.src = image;
            imageWrapperElem.appendChild(imageElem);
            
            imageWrapperElem.addEventListener(this.options.transitionEvent, this._onImageWrapperChange);

            this.container.appendChild(imageWrapperElem);
        });
    }

    _configOptions(config) {
        this.options = {
            containerSelector: '.gallery-container',
            images: [
                "Images/1.jpg", 
                "Images/2.jpg",
                "Images/3.jpg",
                "Images/4.jpg",
                "Images/5.jpg",
                "Images/6.jpg",
            ],
            width: 1250,
            aspectRatio: '5:3',
            foregroundImageProportion: '60%',
            transitionEvent: 'click', // 'hover'
            transitionDuration: 2
          };
 
        if(config) {
            Object.assign(this.options, this.options, config);
        }
    }

    // #Region Events

    _onImageWrapperChange(e) {
        this._getImageWrappers().forEach(imgWrapper => imgWrapper.classList.remove("foreground"));
        e.currentTarget.classList.add('foreground');
    }

    // #endregion

    _getImageWrappers() {
        let imageWrapers = this.container.getElementsByClassName('image-wrapper');
        return [...imageWrapers];
    }

    _filterImages() {
        let imagePromises = [];
        this.options.images.forEach(img => {
            var imagePromise = new Promise((resolve, reject) => {
                let image = new Image();
                image.onload = e => {
                    if(this._checkImageAspectRatio(image)) {
                        resolve(img); 
                    } else {
                        reject(img);
                    }
                }
                image.src = img;
            });
            imagePromises.push(imagePromise);
        });

        return new Promise((resolve, reject) => Promise.allSettled(imagePromises).then(values => resolve(values)));
    }

    _checkImageAspectRatio(image) {
        let imageRatio = this._getAspectRatio(image.width, image.height);
        return imageRatio === this.options.aspectRatio;
    }

    _getAspectRatio(width, height) {
        let gcd = this._computeGreatCommonDivisor(width, height);
        let aspect = `${width / gcd}:${height / gcd}`;
        return aspect;
    }

    _computeGreatCommonDivisor(a, b) {
        if(b == 0) {
            return a;
        }
        return this._computeGreatCommonDivisor(b, a % b);
    }
}