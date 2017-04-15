'use strict';

export default () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('This browser not support Web API "geolocation"'));
        }

        const success = position => {
            resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        };

        navigator.geolocation.getCurrentPosition(success, reject);
    });
};
