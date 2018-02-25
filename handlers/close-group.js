const moment = require('moment');
const utility = require('../utility');

const DAY_OF_YEAR = 2;
const YEAR = 1991;

class CloseGroupHandler {
    constructor(config) {
        // THIS LINE IS FORE TESTING
        // this.openInOneMinute(config);

        this.closeAt = this.normalize(moment(config.closeAt, 'HH:mm'));
        this.openAt = this.normalize(moment(config.openAt, 'HH:mm'));
        this.isAnnounced = false;
    };

    canHandle(msg, meta) {
        if (msg.chat.type != 'supergroup')
            return false;

        if (this.isOpenNow())
            this.isAnnounced = false;

        return this.isClosedNow();
    };

    handle(msg, meta, bot) {
        this.announce(msg, bot);
        utility.deleteMessage(msg, bot);
    };

    announce(msg, bot) {
        if (this.isAnnounced)
            return;

        this.isAnnounced = true;
        bot.sendMessage(msg.chat.id, 'گروه تعتیل است.');
    };

    isClosedNow() {
        return !this.isOpenNow();
    };

    isOpenNow() {
        let now = this.normalize(moment());

        // if group closes before 00:00
        if (this.openAt < this.closeAt)
            return now.isBetween(this.openAt, this.closeAt);

        // if group has been opened today.
        if (now > this.openAt)
            return now.isBetween(this.openAt, this.closeAt.clone().add(1, 'day'));

        // if group has been opened yesterday.
        return now.isBetween(this.openAt.clone().subtract(1, 'day'), this.closeAt);
    };

    normalize(moment) {
        return moment.dayOfYear(DAY_OF_YEAR).year(YEAR);
    };

    openInOneMinute(conifg) {
        const now = this.normalize(moment());
        conifg.openAt = now.clone().add(1, 'minute').format('HH:mm');
        conifg.closeAt = now.clone().add(2, 'minute').format('HH:mm');
    };
}

module.exports = CloseGroupHandler;