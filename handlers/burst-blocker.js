const utility = require('../utility');
const fs = require('fs');
const _ = require('underscore');
const nl = require('os').EOL;

class BurstBlockerHandler {
    constructor(config) {
        const defaultConfig = {
            'duration': 60,
            'count': 10,
            'blockDuration': 60 * 10
        };

        this.config = _.extendOwn(config, defaultConfig);
        this.state = {};
    };

    canHandle(msg, meta) {
        const sender = msg.from.id;
        const date = msg.date;
        let userActivity = this.state[sender];

        console.log(userActivity);

        if (!userActivity) {
            this.createUserState(sender, date);
            return false;
        }

        if (userActivity.isBlocked) {
            if (userActivity.isBlocked.to < date) {
                this.createUserState(sender, date);
                return false;
            }

            return true;
        }

        this.rotateUserState(userActivity, date);
        return this.shouldBlock(userActivity);
    };

    handle(msg, meta, bot) {
        utility.deleteMessage(msg, bot);
        bot.sendMessage(msg.chat.id, 'شما تا ' + this.config.duration + ' ثانیه دیگر بلاک هستید.');
    };

    shouldBlock(userActivity) {
        if (userActivity.dates.length <= this.config.count)
            return false;

        userActivity.isBlocked = {
            to: _.last(userActivity.dates) + this.config.duration
        };
        return true;
    };

    createUserState(sender, date) {
        this.state[sender] = {
            'dates': [date]
        };
    };

    rotateUserState(userActivity, date) {
        userActivity.dates = _.filter(userActivity.dates, activityDate => date - activityDate < this.defaultConfig.duration);
        userActivity.dates.push(date);
    };
}

module.exports = BurstBlockerHandler;