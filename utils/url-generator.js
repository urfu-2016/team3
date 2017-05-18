'use strict';

const extractParameter = id => id || ':id';

const self = module.exports = { // eslint-disable-line no-multi-assign
    common: {
        main: () => '/',
        about: () => '/about',
        error: () => '/error'
    },
    photos: {
        root: () => '/photos',
        specific: id => `${self.photos.root()}/${extractParameter(id)}`,
        image: id => `${self.photos.specific(id)}/image`,
        checkin: id => `${self.photos.specific(id)}/checkin`
    },
    quests: {
        root: () => '/quests',
        create: () => `${self.quests.root()}/create`,
        specific: id => `${self.quests.root()}/${extractParameter(id)}`,
        publish: id => `${self.quests.specific(id)}/publish`,
        search: () => `${self.quests.root()}/search`,
        remove: id => `${self.quests.specific(id)}/remove`,
        edit: id => `${self.quests.specific(id)}/edit`,
        comment: id => `${self.quests.specific(id)}/comment`
    },
    users: {
        root: () => '/users',
        profile: id => `${self.users.root()}/${extractParameter(id)}`,
        login: () => '/login',
        loginVK: () => `${self.users.login()}/vk`,
        loginTwitter: () => `${self.users.login()}/twitter`,

        register: () => '/register',
        logout: () => '/logout',
        emailVerification: () => '/email-verification/:id'
    }
};
