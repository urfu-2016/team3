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
    /* global navigator */
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
                const EXPECTED_REFS = ['N', 'E'];
                const dmsToDecimal = (coordinate, ref) => (~EXPECTED_REFS.indexOf(ref) ? 1 : -1) *
                (coordinate[0] + (coordinate[1] / 60) + (coordinate[2] / 3600));
                resolve({
                    latitude: dmsToDecimal(lat, latRef),
                    longitude: dmsToDecimal(lon, lonRef)
                });
            } catch (err) {
                reject(err);
            }
        });
    });
};
