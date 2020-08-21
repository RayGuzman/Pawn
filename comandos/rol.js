module.exports = async (client, message, args) => {
  
  let msg = message.channel;
  let autor = message.member
  
  const mapper = client.roles.cache.get("741103640110170192")
  
  if(args[0] === "mapper") {
    if(autor.roles.cache.has("741103640110170192")) return;
    
    
    message.member.roles.add("741103640110170192")
    message.author.send("**Recibiste el rol <@741103640110170192>!**")
    
  } 
  
}