const Command = require('../Structures/Command.js');
const Discord = require('discord.js');
const Jimp = require('jimp');

module.exports = new Command({
    name: "clown",
    description: "A image command",

    async run(message, args, client)
    {
        let avatar = await Jimp.read(message.author.displayAvatarURL({ format: 'png' })) 
        let clown = await Jimp.read('ImageResources/YouAreNotAClown.png');
        
        clown.composite(avatar, 400 - avatar.getWidth()/2, 100 - avatar.getHeight()/2)
        .write('ImageHolder/YouAreNotAClown.jpg'); // save       
          
        message.channel.send({files: ["./ImageHolder/YouAreNotAClown.jpg"]})
    }
});