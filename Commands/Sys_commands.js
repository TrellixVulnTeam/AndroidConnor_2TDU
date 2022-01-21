const Command = require('../Structures/Command.js');
const Discord = require('discord.js');
const config = require('../config.json');

module.exports = new Command({
    name: "commands",
    description: "shows a list of all commands",

    async run(message, args, client)
    {
       const embed = new Discord.MessageEmbed();
       embed.setTitle("Commands")
       embed.setColor(config.normalColor);

       client.commands.forEach(com => 
       {
         let comName = com.name;
         let comDes = com.description;

         comName = comName? comName : "Missing Name";
         comDes = comDes? comDes : "Missing Name";

         embed.addField(config.prefix + com.name, com.description);
       });      

       message.channel.send({embeds: [embed] })
    }
});