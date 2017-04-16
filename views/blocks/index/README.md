# Index

Содержит глобальные стили и JS модули

## JS модули

### geolocation.js
Promise'ный модуль для работы с геолокацией на клиенте

```javascript

import geoLocation from './geolocation';

geoLocation().then(location => {
    console.info(`latitude: ${location.latitude}`);
    console.info(`longitude: ${location.longitude}`);
});
```
### touch-emitter.js

EventEmitter модуль для работы с Touch Events

```javascript
import TouchEmitter from './touch-emitter';

const touch = new TouchEmitter(new Image());
touch.on('tap', () => {
    // нажатие
});
touch.on('swipe', next => {
    if (next) {
        // свайп влево
    } else {
        // свайп вправо
    }
});
```
