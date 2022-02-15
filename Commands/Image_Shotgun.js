const Command = require('../Structures/Command.js');
const Jimp = require('jimp');

module.exports = new Command({
    name: "shotgun",
    description: "An image command",

    async run(message, args, client)
    {
        let avatar = await Jimp.read(message.author.displayAvatarURL({ format: 'png' })) 
        let shotgun = await Jimp.read('Images/Resources/Shotgun.jpg');

        shotgun.composite(avatar, 360 - avatar.getWidth()/2, 90 - avatar.getHeight()/2) 
        .write("./Images/Cache.jpg"); // save  
         
          
        message.channel.send({files: ["./Images/Cache.jpg"]})
    }
});