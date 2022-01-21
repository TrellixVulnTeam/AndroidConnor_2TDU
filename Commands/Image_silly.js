const Command = require('../Structures/Command.js');
const Jimp = require('jimp');

module.exports = new Command({
    name: "silly",
    description: "A image command",

    async run(message, args, client)
    {
        let avatar = await Jimp.read(message.author.displayAvatarURL({ format: 'png' })) 
        let phoenix = await Jimp.read('Images/Resources/PhoenixScratch.jpg');

        avatar.resize(80, 80);

        phoenix.composite(avatar, 150 - avatar.getWidth()/2, 50 - avatar.getHeight()/2) 
        .write("./Images/Cache.jpg"); // save  
         
          
        message.channel.send({files: ["./Images/Cache.jpg"]})
    }
});