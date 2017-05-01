'use strict';

import {EXIF as exif} from 'exif-js';

const success = resolve => {
    return position => {
        resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    };
};

export const geoLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('This browser not support Web API "geolocation"'));
        }

        navigator.geolocation.getCurrentPosition(success(resolve), reject);
    });
};

export const photoGeoTag = img => {
    return new Promise((resolve, reject) => {
        exif.getData(img, function () {
            try {
                const lat = exif.getTag(this, 'GPSLatitude');
                const lon = exif.getTag(this, 'GPSLongitude');
                const latRef = exif.getTag(this, 'GPSLatitudeRef') || 'N';
                const lonRef = exif.getTag(this, 'GPSLongitudeRef') || 'W';
                resolve({
                    latitude: (lat[0] + (lat[1] / 60) + (lat[2] / 3600)) * (latRef === 'N' ? 1 : -1),
                    longitude: (lon[0] + (lon[1] / 60) + (lon[2] / 3600)) * (lonRef === 'W' ? -1 : 1)
                });
            } catch (err) {
                reject(err);
            }
        });
    });
};
