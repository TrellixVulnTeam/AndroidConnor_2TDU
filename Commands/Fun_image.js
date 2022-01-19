const Command = require('../Structures/Command.js');
const Discord = require('discord.js');
const config = require('../settings/config.json');
const cheerio = require("cheerio");
const cloudscraper = require('cloudscraper');

module.exports = new Command({
    name: "image",
    description: "searches google for image",

    async run(message, args, client)
    {
      let embed = new Discord.MessageEmbed();
      embed.setColor(config.normalEmbedColor);
      embed.setTitle("**Please wait...**");

      let searchTerm = args.slice(1).join(" ");
      const msg = await message.channel.send({embeds: [embed]});

      var options = {
        uri: "http://results.dogpile.com/serp?qc=images&q="+searchTerm,
        headers: {
          // User agent, Cache Control and Accept headers are required
          // User agent is populated by a random UA.
          'User-Agent': 'Chrome',
          'Cache-Control': 'private',
          'Accept': 'text/html'
        },
        // Cloudscraper automatically parses out timeout required by Cloudflare.
        // Override cloudflareTimeout to adjust it.
        cloudflareTimeout: 5000,
        // Reduce Cloudflare's timeout to cloudflareMaxTimeout if it is excessive
        cloudflareMaxTimeout: 30000,
        // followAllRedirects - follow non-GET HTTP 3xx responses as redirects
        followAllRedirects: true,
        // Support only this max challenges in row. If CF returns more, throw an error
        challengesToSolve: 3,
        // Remove Cloudflare's email protection, replace encoded email with decoded versions
        decodeEmails: false,
        // Support gzip encoded responses (Should be enabled unless using custom headers)
        gzip: true,
      };
       
      cloudscraper(options)
      .then(response => 
      {
          $ = cheerio.load(response); // load responseBody into cheerio (jQuery)
 
          // In this search engine they use ".image a.link" as their css selector for image links
           var links = $(".image a.link");

          // We want to fetch the URLs not the DOM nodes, we do this with jQuery's .attr() function
          // this line might be hard to understand but it goes thru all the links (DOM) and stores each url in an array called urls
          var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));

          if (!urls.length) 
          {
                
              msg.delete();

              embed.setColor(config.warningEmbedColor);
              embed.setTitle("No match found.");
              message.channel.send({embeds:[embed]}).then(msg => msg.delete({timeout: 3000 }));

              return;
          }
     
          // Send result
          msg.delete();
          message.channel.send( urls[~~(Math.random() * 5)] );
      })
      .catch(err => 
      {
        embed.setColor(config.warningEmbedColor);
        embed.setTitle(err);
        message.channel.send({embeds:[embed]}).then(msg => msg.delete({timeout: 3000 }));
      })
    }

});