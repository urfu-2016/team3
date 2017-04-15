'use strict';

import {EventEmitter} from 'events';

export default class TouchEmitter extends EventEmitter {
    constructor(node) {
        super();
        this._node = node;
        this._event = null;
        this._init();
    }
    _init() {
        this._node.addEventListener('touchstart', event => {
            event.currentTarget.touchStartPosition = [...event.targetTouches];
        });
        this._node.addEventListener('touchend', event => {
            const points = event.currentTarget.touchStartPosition;
            const start = points[0];
            const end = [...event.changedTouches][0];
            if (points.length === 1) {
                if (Math.sqrt(Math.pow(start.clientX - end.clientX, 2) + Math.pow(start.clientY - end.clientY, 2)) < 5) {
                    this.emit('tap');
                }
                if (start.clientX > end.clientX) {
                    this.emit('swipe', true);
                } else {
                    this.emit('swipe', false);
                }
            }
        });
    }
}
