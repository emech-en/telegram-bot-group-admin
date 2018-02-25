class Utility {
    deleteMessage(msg, bot) {
        if (msg.isDeleted)
            return;

        msg.isDeleted = true;
        setTimeout(() => bot.deleteMessage(msg.chat.id, msg.message_id), 1);
    }
}

module.exports = new Utility();