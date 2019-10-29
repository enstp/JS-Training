;(function($, window, document, undefined) {

    $.fn.PESStaticGallery = function(options) {
        // Default options
        var defaults = {
            containerSelector: '#gallery-container',
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
            transitionEvent: 'click', // 'hover'
            transitionDuration: 2,
        };
        var settings = $.extend(defaults, options);
    
        return this.each((ind, el) => new Gallery(el, settings).init());
    };

    //
    // Plugin constructor
    //
    function Gallery(container, options)  {
        this.jqContainer = $(container);

        this.images = options.images;
        this.width = options.width;
        this.aspectRatio = options.aspectRatio;
        this.transitionEvent = options.transitionEvent;
        this.transitionDuration = options.transitionDuration;

        // Capture events
        this._onImageWrapperChange = this._onImageWrapperChange.bind(this);
    }

    //
    // Plugin prototype
    //
    Gallery.prototype = {
        constructor: Gallery,

        init: function() {
            this._filterImages()
                .then(imageResults => {
                    let validImages = imageResults.filter(imageResult => imageResult.status === 'fulfilled').map(imageResult => imageResult.value);
                    this.images = validImages;
                    
                    let rejectedImages = imageResults.filter(imageResult => imageResult.status === 'rejected').map(imageResult => imageResult.reason);
                    if(rejectedImages.length > 0) {
                        console.log(`The following images have been rejected due to an invalid aspect ratio: ${rejectedImages}`)
                    }

                    // inject Html elements
                    this._constructHtml();
                });
        },

        _constructHtml: function() {
            this.jqContainer.css('width', `${this.width}px`);

            // Add the list of images within their wrappers, into the container element
            this.images.forEach((image, index) => {
                let imageWrapperElem = 
                    $(`<div class="image-wrapper" style="transition: flex-grow ${this.transitionDuration}s linear">
                        <img src="${image}"></img>
                    </div>`); 
                
                imageWrapperElem.on(this.transitionEvent, this._onImageWrapperChange);
                this.jqContainer.append(imageWrapperElem);
            });
        },

        _onImageWrapperChange(e) {
            this.jqContainer.find('.image-wrapper').each((ind, imgWrapper) => $(imgWrapper).removeClass("foreground"));
            $(e.currentTarget).addClass('foreground');
        },

        _filterImages() {
            var self = this;
            let imagePromises = [];
            this.images.forEach(img => {
                var imagePromise = new Promise((resolve, reject) =>
                    $(`<img src="${img}"></img>`)
                        .one("load", function(e) {
                            if(self._checkImageAspectRatio(this)) {
                                resolve(img); 
                            } else {
                                reject(img);
                            }
                        }));

                imagePromises.push(imagePromise);
            });
    
            return new Promise((resolve, reject) => Promise.allSettled(imagePromises).then(values => resolve(values)));
        },
    
        _checkImageAspectRatio(image) {
            let imageRatio = this._getAspectRatio(image.width, image.height);
            return imageRatio === this.aspectRatio;
        },
    
        _getAspectRatio(width, height) {
            let gcd = this._computeGreatCommonDivisor(width, height);
            let aspect = `${width / gcd}:${height / gcd}`;
            return aspect;
        },
    
        _computeGreatCommonDivisor(a, b) {
            if(b == 0) {
                return a;
            }
            return this._computeGreatCommonDivisor(b, a % b);
        }
    }

  }(jQuery, window, document));