// Handle some deprecated stuff.
process.env.NTBA_FIX_319 = 'https://github.com/yagop/node-telegram-bot-api/issues/319';

// Load .env config
require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const HandlerManager = require('./handler-manager');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.API_KEY;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

var handler = new HandlerManager(config);


// Listen for any kind of message.
// There are different kinds of messages.
bot.on('message', (msg, meta) => {
    handler.handle(msg, meta, bot);

    // console.log('msg:', msg);
    // console.log('meta:', meta);

    const chatId = msg.chat.id;

    // console.dir(msg);
    // console.dir(meta);
});