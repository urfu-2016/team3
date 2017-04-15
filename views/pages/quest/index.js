'use strict';

import header from '../../blocks/header';
import quest from '../../blocks/quest_description';
import checkin from '../../blocks/quest_checkin';

const showPoint = () => {
    const questPoints = [...document.querySelector('.quest__points').children];

    questPoints.forEach((point, index) => {
        point.addEventListener('click', () => {
            document.body.appendChild(checkin(questPoints, index));
        });
    });
};

export default () => {
    header();
    quest();
    showPoint();
};
