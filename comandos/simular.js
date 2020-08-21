module.exports = async(client, message, args) => {
  
  if(message.author.id !== "541072831652298752") return;
  
  if(args[0] ==="bienvenida") 
    {
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("No tienes permisos.") //solo los administradores podran usar este comando 
      client.emit("guildMemberAdd", message.member);
      message.channel.send("**Simulando...**")
      
    }
}