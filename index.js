const Discord  = require('discord.js')
const bot = new Discord.Client();

const token = 'NTcxOTM3NzE1ODQ3ODIzMzYw.XMr0IQ.R2A1dkUPOET0gR_p5P7-uO2b8Fk';

const PREFIX = '#';

bot.on('ready', () => {
    console.log('This bot is online');
    bot.user.setActivity('End game', { type: 'WATCHING'}).catch(console.error);
})

bot.on('message', message=>{

    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'serverinfo':
        let serverembed = new Discord.RichEmbed()
        .setTitle("Server Information")
        .setColor("0ED4DA")
        .setThumbnail(message.guild.iconURL)
        .addField('Name', `${message.guild.name} (${message.guild.nameAcronym})`, true)
        .addField('Server Owner', message.guild.owner.user.tag, true)
        .addField("Server Create Date", message.guild.createdAt, true)
        .addField("Member Count", message.guild.memberCount, true)
      
        return message.channel.send(serverembed);
      }
      
      
      module.exports.help = {
        name: "serverinfo",
        description: "Gathers information about the server."
      }

//!clearrr
switch(args[0]){
  case 'clear':
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGE")) return message.channel.send("คุณไม่ได้รับอนุญาตให้ใช้คำสั่งนี้!");
            
        let args = message.content.split(" ").slice(1);

        if(args >= 100) return message.channel.send("คุณไม่สามารถล้างข้อความมากกว่า 100 ข้อความในครั้งเดียว")
            
        if(!args[0]) return message.channel.send("คุณยังไม่ได้ระบุจำนวนข้อความที่จะลบ")
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`${args[0]} ได้ลบหมดแล้ว !`);
        })
    }

//!help
//!https://sourcecode.glitch.me/view?key=4045289604376796
switch(args[0]){
  case 'help':
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
        .setThumbnail(bicon)
        .addField("Default Prefix", `#`)
        .addField("Moderation", `****Ban :**ใช้แบนผู้คนในดิส \n<prefix><ban> <user> <reason>\n**Kick :** ใช้เตะผู้คนในดิส\n<prefix><kick> <user> <reason>\n**Mute :** ใช้ mute ผู้คนในดิส \n<prefix><mute> <user> <HH:mm:ss>**\n**Clear :** ใช้ลบข้อความโดยสามารถลบใน 1 ครั้งได้แค่ 100 คำ\n<prefix><clear> <amount of messages>`)
        .addField("Guild Commands", `**#serverinfo :** เพื่อดูรายละเอียดของเซิฟเวอร์' \n**#Userinfo : ** เพื่อดูรายละเอียดของคุณ \n**#botinfo :** เพื่อดูรายละเอียดของบอท** `)
        .addField("ลิ้งค์ดิสคอดถาวร", `**https://discord.gg/whGxGfg** `)
        .setFooter(`Requested by : ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
        .setColor('RANDOM');

    message.channel.send(botembed);
}
//!...awda
switch(args[0]){
  case 'botinfo':
  let boticon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
  .setDescription("Bot Information")
  .setColor("0ED4DA")
  .setThumbnail(boticon)
  .addField("Bot Name", bot.user.username)
  .addField("Bot Create Date", bot.user.createdAt)
  .addField("Servers", bot.guilds.size)

  message.channel.send(botembed)
}

module.exports.help = {
  name: "botinfo",
  description: "Shows the bot's info."
}
//!.....awd
    switch(args[0]){
        case 'report':
        
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return message.channel.send("Couldn't find user.");
        let rreason = args.join(" ").slice(22);
    
        let reportEmbed = new Discord.RichEmbed()
        .setDescription("Reports")
        .setColor("#15f153")
        .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
        .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
        .addField("Channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", rreason);
    
        let reportschannel = message.guild.channels.find(`name`, "reports");
        if(!reportschannel) return message.channel.send("Couldn't find reports channel.");
    
    
        message.delete().catch(O_o=>{});
        reportschannel.send(reportEmbed);
    
        return;
      }
    switch(args[0]){
        case 'kick':
  
      //!kick @daeshan askin for it
  
      let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!kUser) return message.channel.send("Can't find user!");
      let kReason = args.join(" ").slice(22);
      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
      if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");
  
      let kickEmbed = new Discord.RichEmbed()
      .setDescription("~Kick~")
      .setColor("#e56b00")
      .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
      .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Kicked In", message.channel)
      .addField("Tiime", message.createdAt)
      .addField("Reason", kReason);
  
      let kickChannel = message.guild.channels.find(`name`, "ban-list");
      if(!kickChannel) return message.channel.send("Can't find incidents channel.");
  
      message.guild.member(kUser).kick(kReason);
      kickChannel.send(kickEmbed);
  
      return;
    }
  
    switch(args[0]){
        case 'ban':
  
      let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!bUser) return message.channel.send("Can't find user!");
      let bReason = args.join(" ").slice(22);
      if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
      if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");
  
      let banEmbed = new Discord.RichEmbed()
      .setDescription("~Ban~")
      .setColor("#bc0000")
      .addField("Banned User", `${bUser} with ID ${bUser.id}`)
      .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Banned In", message.channel)
      .addField("Time", message.createdAt)
      .addField("Reason", bReason);
  
      let incidentchannel = message.guild.channels.find(`name`, "ban-list");
      if(!incidentchannel) return message.channel.send("Can't find incidents channel.");
  
      message.guild.member(bUser).ban(bReason);
      incidentchannel.send(banEmbed);
  
  
      return;
    }
    switch(args[0]){
        case 'mute':
  //!tempmute @user 1s/m/h/d

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
  let muterole = message.guild.roles.find(`name`, "muted");

  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));


//end of module
}
});

//!welcome message 
bot.on('guildMemberAdd', member => {
  let channel = member.guild.channels.find('name', '👉สมาชิกใหม่');
  let memberavatar = member.user.avatarURL
      if (!channel) return;
      let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(memberavatar)
      .addField(':bust_in_silhouette: | name : ', `${member}`)
      .addField(':microphone2: | Welcome!', `ยินดีต้อนรับ, ${member}`)
      .addField(':id: | User :', "**[" + `${member.id}` + "]**")
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
bot.login(token);
//!pass winoycraft12!
//!name one-two-3
