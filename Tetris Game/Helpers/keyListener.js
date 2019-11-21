class KeyListener {
    constructor(eventTarget, handler) {
        this.eventTarget = eventTarget;
        this.handler = handler;

        this._listen = this._listen.bind(this);
    }

    start() {
        this.eventTarget.addEventListener('keydown', this._listen);
    }

    stop() {
        this.eventTarget.removeEventListener('keydown', this._listen);
    }

    _listen(keyEvent)
    {
        switch (keyEvent.keyCode)
        {
            case 37:                  
                this.handler(PES.Constants.allowedMoves.left);
                break;
            case 39:
                this.handler(PES.Constants.allowedMoves.right);
                break;
            case 40:
                this.handler(PES.Constants.allowedMoves.down);
                break;
            default:
                break;
            }
    }
}