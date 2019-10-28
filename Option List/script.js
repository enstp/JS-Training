
var PES = PES || {};

PES.OptionList = class {
    constructor(containerSelector){
        this.container = document.querySelector(containerSelector);

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
            this.container.innerHTML = '';
            this.itemType = value;
            this._construct();
        }
    }

    set data(value){
        if(value.constructor == Array) {
            this.itemCollection = value;
            this._construct();
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
        let itemElem = this._createItemElem(item, lastItemIndex);
        this.container.appendChild(itemElem);
    }

    _construct() {
        this.itemCollection.forEach((item, index) => {
            let itemElem = this._createItemElem(item, index);
            this.container.appendChild(itemElem);
        });

        if(this.itemType === 'radio' && this._noInputChecked()) {
            if(this.itemCollection.length > 0) {
                // Mark the first radio button checked as default
                this.itemCollection[0].checked = true;
                this.container.querySelector('input').setAttribute('checked', 'checked');
            }
        }
    }

    _createItemElem(item, index) {
        let type = this.type;
        let idAttr = `${type}-${index}`;
        let itemElem = document.createElement('div');
        itemElem.className += `custom-control custom-${type}`;

        let inputElem = this._createInput(type, item.checked);
        inputElem.setAttribute('id', idAttr);
        inputElem.addEventListener('change', this._onChangeInputOption)
        itemElem.appendChild(inputElem);

        let labelElem = this._createLabel(item.label, idAttr);
        itemElem.appendChild(labelElem);
        return itemElem;
    }

    _createInput(type, checked) {
        let inputElem = document.createElement('input');
        inputElem.setAttribute('type', type);
        inputElem.className += 'custom-control-input';

        if(checked) {
            if(type === 'checkbox' || this._noInputChecked()) {
                inputElem.setAttribute('checked', 'checked');
            } 
        }

        if (type === 'radio') {
            inputElem.setAttribute('name', 'radio-group');
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
        
        this._updateItemData(e.currentTarget, checked);
    }

    _noInputChecked() {
        let inputsAlreadyChecked = this._getInputElements().filter(elem => elem.getAttribute('checked') === 'checked');
        return inputsAlreadyChecked.length === 0;
    }

    _getInputElements() {
        let inputElements = this.container.querySelectorAll('input');
        return [...inputElements];
    }

    _updateItemData(iputTarget, checked) {
        var currentElementIndex = this._getInputElements().indexOf(iputTarget);

        let itemData = this.itemCollection[currentElementIndex];
        itemData.checked = checked;
    }
}