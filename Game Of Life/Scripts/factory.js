class Factory {
    static createGolModel(type, containerElement, size) {
        switch(type) {
            case 'canvas':
                return new Canvas(containerElement, size);
            case 'font':
                return new Font(containerElement, size);
        } 
    }
}
 