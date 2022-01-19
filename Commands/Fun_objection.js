const Command = require('../Structures/Command.js');

module.exports = new Command({
    name: "objection",
    description: "Your honor, I object.",

    async run(message, args, client)
    {
        message.channel.send("** OBJECTION!** \n https://youtu.be/vDMwDT6BhhE");
    }
});