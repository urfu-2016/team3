'use strict';

import {EventEmitter} from 'events';

export default class TouchEmitter extends EventEmitter {
    constructor(node) {
        super();
        this._node = node;
        this._zoom = 0;
        this._init();
    }
    _init() {
        this._node.addEventListener('touchstart', event => {
            const points = [...event.targetTouches];
            this._touchStart = points;
            this._touchMove = points;
        });
        this._node.addEventListener('touchmove', event => {
            const points = [...event.targetTouches];
            if (points.length === 2) {
                const deltaNew = Math.abs(points[0].clientX - points[1].clientX);
                const deltaOld = Math.abs(this._touchMove[0].clientX - this._touchMove[1].clientX);
                this._zoom += deltaNew > deltaOld ? 1 : this._zoom <= 0 ? 0 : -1;
            }
            this._touchMove = points;
        });
        this._node.addEventListener('touchend', event => {
            const start = this._touchStart[0];
            const end = [...event.changedTouches][0];
            if (this._touchStart.length === 1 && this._zoom === 0) {
                if (Math.sqrt(Math.pow(start.clientX - end.clientX, 2) + Math.pow(start.clientY - end.clientY, 2)) < 5) {
                    this.emit('tap');
                }
                if (Math.abs(start.clientX - end.clientX) >= Math.abs(start.clientY - end.clientY)) {
                    if (start.clientX >= end.clientX) {
                        this.emit('swipeLeft');
                    } else {
                        this.emit('swipeRight');
                    }
                } else if (start.clientY >= end.clientY) {
                    this.emit('swipeUp');
                } else {
                    this.emit('swipeDown');
                }
            }
        });
    }
}
