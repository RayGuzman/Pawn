const Discord = require("discord.js");
const db = require("megadb");

let canal_nivel = new db.crearDB("canal_nivel");

module.exports = async (client, message, args) => {
  
  
    let user = message.mentions.members.first() || message.member;
  if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.reply("no tienes permisos de `ADMINISTRATOR`");
    let canal =
      message.mentions.channels.first() || client.channels.cache.get(args[0]);
    if (!canal)
      return message.reply("recuerda `MENCIONAR` o poner la `ID` del canal");
    canal_nivel.establecer(message.guild.id, canal.id);
    
    
    let embed = new Discord.MessageEmbed()
      .setTitle("📎 Nuevo Canal De Niveles")
      .setDescription("‼ Este canal se ha establecido para niveles del servidor. ‼")
      .addField("🔔 Canal", canal)
      .addField("📪 Servidor", message.guild.name);
    message.channel.send(embed).then(m => {
      m.delete({timeout: 100000});
      
    }
   )
  
}