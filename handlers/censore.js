const utility = require('../utility');
const fs = require('fs');
const _ = require('underscore');
const nl = require('os').EOL;

class CensoreHandler {
    constructor(config) {
        this.censoreList = [];

        if (config.censoreFiles)
            this.readFromFile(config.censoreFiles);

        if (config.censoreList)
            this.censoreList = _.union(this.censoreList, config.censoreList);

        console.log(this.censoreList);
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

    readFromFile(files) {
        _.each(files, file => {
            const data = fs.readFileSync(file, 'utf8');
            const censoreList = data.split(nl);
            this.censoreList = _.union(this.censoreList, _.filter(censoreList, line => line.trim()));
        });
    };
}

module.exports = CensoreHandler;