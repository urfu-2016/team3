'use strict';

const success = resolve => {
    return position => {
        resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    };
};

export default () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('This browser not support Web API "geolocation"'));
        }

        navigator.geolocation.getCurrentPosition(success(resolve), reject);
    });
};
