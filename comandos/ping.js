module.exports = async (client, message, args) => {
  
  if(!message.author.bot) return;
  message.channel.send("pong")
  
}