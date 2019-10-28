;(function($, window, document, undefined) {

    $.fn.PESGallery = function(options) {
        // Default options
        var defaults = {
            width: 600,
            height: 400,
            interval: 1000,
            images: [ 'Images/default-placeholder.png' ]
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
        this.height = options.height;
        
        this.slideIndex = 1;
        this.animationTimeout = options.interval;
        this.timeout = null;

        this._moveToNext = this._moveToNext.bind(this);
        this._moveToPrevious = this._moveToPrevious.bind(this);
    }

    //
    // Plugin prototype
    //
    Gallery.prototype = {
        constructor: Gallery,

        init: function() {
             // inject Html elements
            this._constructHtml();
            this.jqContainer.css({
                'width': `${this.width}px`,
                'height': `${this.height}px`,
                'display': 'table',
                'position': 'relative'
            });

            // Set the default carousel item to be first image
            this._moveToNext(this.slideIndex);
        },

        _constructHtml: function() {
            // Add the list of images into the container element
            var jqGallery = $('<ul></ul>'); 
            this.images.forEach((img, ind) => {
                var imageWrapperJqElem = $('<li></li>').addClass("fade");
                var imageJqElem = $('<img></img>').attr({ src : img }).css({
                        'max-width': `${this.width}px`,
                        'max-height': `${this.height- 25}px`,
                    });
                imageWrapperJqElem.append(imageJqElem);
                jqGallery.append(imageWrapperJqElem);
             });
             this.jqContainer.append(jqGallery)
    
            // Add the prev button
            var prevElem = $('<a>&#10094;</a>').addClass('prev').click(this._moveToPrevious);
            this.jqContainer.append(prevElem);
    
            // Add the next button
            var nextElem = $('<a>&#10095;</a>').addClass('next').click(this._moveToNext);
            this.jqContainer.append(nextElem);
    
            // Add the dot elements
            var dotsContainer = $('<div></div>').addClass('dots-container').css({
                'left': `${(this.width - (16 * this.images.length)) / 2}px`
            });
    
            this.images.forEach((img, ind) => {
                var dotJqElem = $('<span></span>').addClass('dot').click(this._setCurrentSlide.bind(this, ind + 1));
                dotsContainer.append(dotJqElem);
             });
             this.jqContainer.append(dotsContainer);
        },

        _moveToNext: function() {
            this._setCurrentSlide(this.slideIndex + 1);
        },
    
        _moveToPrevious: function() {
            this._setCurrentSlide(this.slideIndex - 1);
        },
    
        _setCurrentSlide: function(slideNo) {
            this._moveToSlide(slideNo);
        },
    
        _moveToSlide: function(n) {
            clearTimeout(this.timeout);
    
            var slides = this.jqContainer.find("li");
            var dots = this.jqContainer.find(".dot");
    
            if (n > slides.length) // come back to the first
                this.slideIndex = 1;
            else if (n < 1) // go to the last
                this.slideIndex = slides.length;
            else
                this.slideIndex = n;
    
            var i;            
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";  
            }
    
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
    
            slides[this.slideIndex - 1].style.display = "block"; 
            dots[this.slideIndex - 1].className += " active"; 
    
            // Change image every x seconds
            this.timeout = setTimeout(() => this._setCurrentSlide(this.slideIndex + 1), this.animationTimeout); 
        }
    }

  }(jQuery, window, document));