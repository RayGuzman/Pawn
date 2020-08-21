module.exports = async (client, message, args, connection) => {
  
  let msg = message.channel
  
  let perm = message.member.roles.cache.has("740731670780575865")
  if(!perm) return
  let usuari = message.mentions.users.first() || message.author
  
  let usuario = usuari.id
  
  let u = client.users.cache.get(usuario)
  if(!u) return message.channel.send("Usuario no encontrado.")
  
  let algo = "asd"
  
  connection.query(
        'SELECT * FROM `log_PawnPoints` WHERE `Usuario2` = ?',
        [u.id],
    function(err, results) {
    
      console.log(results[0])
      if(results[0] === undefined) {
        algo = "as"
      }
      
    });
  
  console.log(algo)
  if(algo !== "asd") return msg.send("Este usuario no tiene PawnPoints")
  
   connection.query(
        'SELECT * FROM `log_PawnPoints` WHERE `Usuario2` = ?',
        [u.id],
    function(err, results) {
    
      let map = results.map(x => `~ **PawnPoints** dados por <@${x.Usuario1}>. **El dia ${x.fecha}**`).join("\n")
      message.channel.send({embed: {
        title: `Log de PawnPoints del usuario ${u.username}`,
        description: map
      }})
      
    });
  
}