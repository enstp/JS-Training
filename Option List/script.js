
var PES = PES || {};

PES.OptionList = class {
    constructor(containerSelector) {
        this.containers = document.querySelectorAll(containerSelector);

        // Capture events
        this._onChangeInputOption = this._onChangeInputOption.bind(this);
        this.itemCollection = new Array();
        this.itemType = 'checkbox';
    }

    // #region Properties

    get type() { 
        return this.itemType; 
    }

    set type(value) { 
        if(value == 'radio' || value == 'checkbox') {
            this.itemType = value;
            this._runOnContainers(this._construct.bind(this));
        }
    }

    set data(value){
        if(value.constructor == Array) {
            this.itemCollection = value;
            this._runOnContainers(this._construct.bind(this));
        }
    }

    // #endregion

    addItem(label, checked) {
        let item = {
            label: label, 
            checked: checked
        };

        this.itemCollection.push(item);
        let lastItemIndex = this.itemCollection.length - 1;
        this._runOnContainers((container, containerIndex) => {
            let itemElem = this._createItemElem(container, containerIndex, item, lastItemIndex);
            container.appendChild(itemElem);
        });
    }

    _construct(container, containerIndex) {
        container.innerHTML = '';
        this.itemCollection.forEach((item, index) => {
            let itemElem = this._createItemElem(container, containerIndex, item, index);
            container.appendChild(itemElem);
        });

        if(this.itemType === 'radio' && this._noInputChecked(container)) {
            if(this.itemCollection.length > 0) {
                // Mark the first radio button checked as default
                this.itemCollection[0].checked = true;
                container.querySelector('input').setAttribute('checked', 'checked');
            }
        }
    }

    _createItemElem(container, containerIndex, item, index) {
        let type = this.type;
        let idAttr = `${containerIndex}-${type}-${index}`;
        let itemElem = document.createElement('div');
        itemElem.className += `custom-control custom-${type}`;

        let inputElem = this._createInput(container, containerIndex, type, item.checked);
        inputElem.setAttribute('id', idAttr);
        inputElem.addEventListener('change', this._onChangeInputOption)
        itemElem.appendChild(inputElem);

        let labelElem = this._createLabel(item.label, idAttr);
        itemElem.appendChild(labelElem);
        return itemElem;
    }

    _createInput(container, containerIndex, type, checked) {
        let inputElem = document.createElement('input');
        inputElem.setAttribute('type', type);
        inputElem.className += 'custom-control-input';

        if(checked) {
            if(type === 'checkbox' || this._noInputChecked(container)) {
                inputElem.setAttribute('checked', 'checked');
            } 
        }

        if (type === 'radio') {
            inputElem.setAttribute('name', `radio-group-${containerIndex}`);
        }

        return inputElem;
    }

    _createLabel(label, inputIdAttr) {
        let inputElem = document.createElement('label');
        inputElem.className += 'custom-control-label';
        inputElem.setAttribute('for', inputIdAttr);
        inputElem.innerHTML = label;
        return inputElem;
    }

    _onChangeInputOption(e) {
        let checked = e.currentTarget.checked;
        let label = e.currentTarget.nextSibling.innerHTML;
        
        let container = e.currentTarget.parentElement.parentElement
        this._updateItemData(container, e.currentTarget, checked);
    }

    _noInputChecked(container) {
        let inputsAlreadyChecked = this._getInputElements(container).filter(elem => elem.getAttribute('checked') === 'checked');
        return inputsAlreadyChecked.length === 0;
    }

    _getInputElements(container) {
        let inputElements = container.querySelectorAll('input');
        return [...inputElements];
    }

    _updateItemData(container, iputTarget, checked) {
        var currentElementIndex = this._getInputElements(container).indexOf(iputTarget);

        let itemData = this.itemCollection[currentElementIndex];
        itemData.checked = checked;
    }

    _runOnContainers(callback) {
        this.containers.forEach(callback);
    }
}