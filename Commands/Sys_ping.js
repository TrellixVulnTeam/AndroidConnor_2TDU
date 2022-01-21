const Command = require('../Structures/Command.js');
const Discord = require('discord.js');
const config = require('../config.json');

module.exports = new Command({
    name: "ping",
    description: "Ping. Pong.",

    async run(message, args, client)
    {
        const startTime = Date.now();

        let embed = new Discord.MessageEmbed();
        
        embed.setTitle("Server issued")
        .setColor(config.warningColor)

        let originalMessage = 
        await message.channel.send({embeds : [embed]})
        originalMessage.delete();

        //--- Calculates result time ---
        const msElapsed = Date.now() - startTime;

        embed.setTitle("My name is Connor, I am the Android sent by Cyberlife.")
        .setColor(config.succesColor)
        .setDescription(`My respones time is ${msElapsed} ms`);

        await message.channel.send({embeds : [embed]})
    }
});