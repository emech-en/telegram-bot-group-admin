var _ = require('underscore');

class HandlerManager {
    constructor(config) {
        this.handlers = _.mapObject(config, (value, key) => {
            var handlers = {};
            _.each(_.keys(value), (key) => {
                var Handler = require('./handlers/' + key);
                handlers[key] = new Handler(value[key]);
            })
            return handlers;
        });

        console.log(this.handlers);
    }
};

HandlerManager.prototype.handle = function(msg, meta, bot) {
    const chatId = msg.chat.id;
    const handlers = this.handlers[chatId.toString()];

    _.each(handlers, handler => {
        if (handler && handler.canHandle(msg, meta))
            handler.handle(msg, meta, bot);
    });
};

module.exports = HandlerManager;