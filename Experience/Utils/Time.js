import EventEmitter from "./EventEmitter.js";

export default class Time extends EventEmitter {
    constructor() {
        super();

        this.start = Date.now();
        this.delta = 16;

        this._RAF();
    }

    _RAF() {
        requestAnimationFrame((t) => {
            if (this._previousRAF === null) {
                this._previousRAF = t;
            }

            this._RAF();

            this.step(t - this._previousRAF);
            this._previousRAF = t;
        });
    }

    step(time) {
        const timeElapsedS = time * 0.001;
        this.trigger('tick', [timeElapsedS])
    }

}