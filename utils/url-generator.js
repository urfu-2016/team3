'use strict';

const urljoin = require('url-join');

let self;

module.exports = self = { // eslint-disable-line no-multi-assign
    common: {
        main: () => '/',
        about: () => urljoin(self.common.main(), 'about')
    },
    photos: {
        root: () => '/photos',
        specific: id => urljoin(self.photos.root(), '{0}'.format([(id || ':id').toString()])),
        image: id => urljoin(self.photos.root(), '{0}/image'.format([(id || ':id').toString()])),
        checkin: id => urljoin(self.photos.root(), '{0}/checkin'.format([(id || ':id').toString()]))
    },
    quests: {
        root: () => '/quests',
        specific: id => urljoin(self.quests.root(), '{0}'.format([(id || ':id').toString()])),
        create: () => urljoin(self.quests.root(), 'create'),
        publish: id => urljoin(self.quests.root(), '{0}/publish'.format([(id || ':id').toString()])),
        comment: id => urljoin(self.quests.root(), '{0}/comment'.format([(id || ':id').toString()]))
    },
    users: {
        profile: () => '/profile',
        login: () => '/login',
        loginVK: () => urljoin(self.users.login(), 'vk'),
        loginTwitter: () => urljoin(self.users.login(), 'twitter'),
        register: () => '/register',
        logout: () => '/logout'
    }
};
