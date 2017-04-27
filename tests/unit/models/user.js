'use strict';

const expect = require('chai').expect;
const Quest = require('../../../models/quest.js');
const User = require('../../../models/user.js');

describe('User', () => {
    describe('hasAccessToQuest', () => {
        it('should return true if user is author of the quest', () => {
            const user = new User({});
            const quest = new Quest({
                author: user,
                name: 'asdqwer',
                description: 'sdgvbsbSDBX SGWEsADfdsv'
            });
            expect(user.hasAccessToQuest(quest)).to.be.true;
        });

        it('should return true if user is admin', () => {
            const user = new User({isAdmin: true});
            const quest = new Quest({
                author: user,
                name: 'asdqwer',
                description: 'sdgvbsbSDBX SGWEsADfdsv'
            });
            expect(user.hasAccessToQuest(quest)).to.be.true;
        });

        it('should return false if user is not author or admin', () => {
            const quest = new Quest({
                author: new User({}),
                name: 'asdqwer',
                description: 'sdgvbsbSDBX SGWEsADfdsv'
            });
            expect(new User({}).hasAccessToQuest(quest)).to.be.false;
        });
    })
})