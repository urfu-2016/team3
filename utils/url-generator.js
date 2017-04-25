'use strict';

const urljoin = require('url-join');

let self;
function extractParameter(id) {
    return (id || ':id').toString();
}
module.exports = self = { // eslint-disable-line no-multi-assign
    common: {
        main: () => '/',
        about: () => urljoin(self.common.main(), 'about')
    },
    photos: {
        root: () => '/photos',
        specific: id => urljoin(self.photos.root(), '{0}'.format([extractParameter(id)])),
        image: id => urljoin(self.photos.root(), '{0}/image'.format([extractParameter(id)])),
        checkin: id => urljoin(self.photos.root(), '{0}/checkin'.format([extractParameter(id)]))
    },
    quests: {
        root: () => '/quests',
        specific: id => urljoin(self.quests.root(), '{0}'.format([extractParameter(id)])),
        create: () => urljoin(self.quests.root(), 'create'),
        publish: id => urljoin(self.quests.root(), '{0}/publish'.format([extractParameter(id)])),
        comment: id => urljoin(self.quests.root(), '{0}/comment'.format([extractParameter(id)]))
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
