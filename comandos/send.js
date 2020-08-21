module.exports = (client, message, args) => { 
  
  let permisos = message.member.roles.cache.has("740718070687072257")
  
  if(!permisos) return;
  let channel = message.mentions.channels.first()
  let text = args.slice(1).join(" ");
  
  channel.send(text).catch(err => {
    message.channel.send(`Ocurrio un error: ${err}`)
  })

}