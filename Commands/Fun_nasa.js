const Discord = require('discord.js');
const Command = require('../Structures/Command.js');
const fetch = require('node-fetch');
const config = require('../settings/config.json');

module.exports = new Command({
    name: "nasa",
    description: "Sents today's top picture from nasa",

    async run(message, args, client)
    {      
        let result;

        await
        fetch('https://api.nasa.gov/planetary/apod?api_key=OM4SoG6kUYG7fxUUSDJ4AxhGbf7CgVCmd4s57INK')
        .then(res => res.text())
        .then(text => result = text);

        result = JSON.parse(result);

        if(result)
        {
            const embed = new Discord.MessageEmbed()
            .setTitle(result.title)
            .setDescription(result.explanation)
            .setImage(result.url)
            .setColor(config.normalEmbedColor);
    
            message.channel.send({embeds: [embed] });
        }      
    }
});