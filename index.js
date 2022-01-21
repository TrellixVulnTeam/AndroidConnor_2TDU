
require('dotenv').config(); //initialize dotenv
const fs = require("fs");
const config = require('./config.json');
const Discord  = require('discord.js');
const Client = require('./Structures/Client.js');
const client = new Client(); //create new client

fs.readdirSync('./Commands')
.filter(file => file
.endsWith('.js'))
.forEach(file => 
{
    /**
     * @type {Command}
     */
    const command = require(`./Commands/${file}`)
    client.commands.set(command.name, command);
});

client.on("ready", message =>
{
  console.log("Logged in as " + client.user.username);
  client.user.setActivity("Detroit: Become Human"); 
});

//---- ON MESSAGE ----
client.on("messageCreate", message => {

  //Embed
  const embed = new Discord.MessageEmbed();
  embed.setTitle("Command not found")
  .setColor("#ff0000");

  //Command search
  if(message.author.bot) return;
  if(!message.content.startsWith(config.prefix)) return;

  const args = message.content.substring(1).split(/ +/);
  const command = client.commands.find(cmd => cmd.name == args[0]);

  if(!command) return message.channel.send({embeds: [embed] });
      
  command.run(message, args, client);
    
});

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token