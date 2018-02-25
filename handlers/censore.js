const utility = require('../utility');

class CensoreHandler {
    constructor(config) {
        this.censoreList = config.censoreList || [];
    };

    canHandle(msg, meta) {
        if (msg.chat.type != 'supergroup')
            return false;

        return this.shouldCensore(msg.text);
    };

    handle(msg, meta, bot) {
        utility.deleteMessage(msg, bot);
    };

    shouldCensore(text) {
        for (var i = 0; i < this.censoreList.length; i++)
            if (text.includes(this.censoreList[i]))
                return true;

        return false;
    };
}

module.exports = CensoreHandler;