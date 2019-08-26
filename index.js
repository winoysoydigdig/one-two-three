const botconfig = require("./botconfig.json");
const tokenfile = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
let coins = require("./coins.json");
let xp = require("./xp.json");
let purple = botconfig.purple;
let cooldown = new Set();
let cdseconds = 5;

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {

  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity("winoysoydigdig", {type: "WATCHING"});

});


bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }

  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }

  let coinAmt = Math.floor(Math.random() * 15) + 1;
  let baseAmt = Math.floor(Math.random() * 15) + 1;
  console.log(`${coinAmt} ; ${baseAmt}`);

  if(coinAmt === baseAmt){
    coins[message.author.id] = {
      coins: coins[message.author.id].coins + coinAmt
    };
  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if (err) console.log(err)
  });
  let coinEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#0000FF")
  .addField("💸", `${coinAmt} coins added!`);

  message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
  }

  let xpAdd = Math.floor(Math.random() * 7) + 8;
  console.log(xpAdd);

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }


  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 300;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
    .setTitle("Level Up!")
    .setColor(purple)
    .addField("New Level", curlvl + 1);

    message.channel.send(lvlup).then(msg => {msg.delete(5000)});
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });
  let prefix = prefixes[message.guild.id].prefixes;
  if(!message.content.startsWith(prefix)) return;
  if(cooldown.has(message.author.id)){
    message.delete();
    return message.reply("You have to wait 5 seconds between commands.")
  }
  if(!message.member.hasPermission("ADMINISTRATOR")){
    cooldown.add(message.author.id);
  }


  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)

});

//!helpp
module.exports.run = async (bot, message, args) => {
    if (!message.content.startsWith(prefix)) return;
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
        .setThumbnail(bicon)
        .addField("Default Prefix", `.`)
        .addField("Moderation", `**Auto Filter :** Words that are usually not allowed on servers.\n**Set prefix :** Make the bot have any prefix you desire\n<prefix><setprefix> <whatever you want>\n**Ban :** It will __ban__ any user as long the bot has a higher role\n<prefix><ban> <user> <reason>\n**Kick :** It will __kick__ any user as long the bot has a higher role\n<prefix><kick> <user> <reason>\n**Mute :** it will __mute__ an user for which ever amount of time you want\n<prefix><mute> <user> <HH:mm:ss>\n**Add Role :**It will give the any user an specific role, as long as the bot has a higher **Permissions**,\n<prefix><addrole> <user> <rolename>\n**Remove Role :** It will remove  any  role an user have, as long as the bot has higher **Permissions**,\n<prefix><removerole> <user> <rolename>\n**Say :** It will say anything you want, have in mind this is onlgt for Admin's\n<prefix><say> <what you want to say>\n**Clear :** it will clear up 100 messages no older than 14 days\n<prefix><clear> <amount of messages>`)
        .addBlankField()
        .addField("Guild Commands", `**Server Info :** It wil show the server's info\n<prefix><serverinfo>\n**User Info : ** It will show you the bot's information\n<prefix><userinfo>\n**Bot Info :** it will show you the bot's information\n<prefix><serverinfo>\n** Lockdown :** it will lockdown any channel as long as the bot has the proper permissions\n<prefix><lockdown hh-mm-ss>\n if you wish to unlock the channel before the cooldown is done you could do **<prefix><lockdown release or unlock** `)
        .setFooter(`Requested by : ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
        .setColor('RANDOM');

    message.channel.send(botembed);
}

module.exports.help = {
    name: "help"
}


//!welcome message 
bot.on('guildMemberAdd', member => {
  let channel = member.guild.channels.find('name', '👥สมาชิกใหม่');
  let memberavatar = member.user.avatarURL
      if (!channel) return;
      let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(memberavatar)
      .addField(':microphone2: | Welcome!', `ยินดีต้อนรับ, ${member}`)
      .addField(':family_mwgb: | Your are the member', `${member.guild.memberCount}`)
      .addField("Name", `<@` + `${member.id}` + `>`, true)
      .addField('Server', `${member.guild.name}`, true )
      .setFooter(`**${member.guild.name}**`)
      .setTimestamp()

      channel.sendEmbed(embed);
});

bot.on('guildMemberAdd', member => {

  console.log(`${member}`, "has joined" + `${member.guild.name}`)

});
bot.on('message', message => {
    const swearWords = ["ไอวิน", "ไอวินควย","fuck you win"];
    if( swearWords.some(word => message.content.includes(word)) ) {
        message.delete();
        message.author.send('ฮั่นแน่!! เราไม่ควรด่าแอดมินนะครับบบผมมม');
      }
})

bot.login(tokenfile.token);
