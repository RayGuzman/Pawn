module.exports = async (client, message, args, connection) => {
  
  if(message.channel.id !== "740729240118362224") return message.channel.send("**Este comando se puede usar en <#740729240118362224>**")
  
  let usuari = message.mentions.users.first() || message.author
  
  let usuario = usuari.id
  
  let u = message.guild.members.cache.get(usuario)
  
  connection.query(
        'SELECT * FROM `PawnPoints` WHERE `ID_Usuario` = ?',
        [u.id],
    function(err, results) {
      if(results[0] === undefined) {
        
        connection.query(
        'INSERT INTO `PawnPoints` (`ID_Usuario`) VALUES (?)',
        [u.id]);
        
      }
      
    }
    
  );
  
  connection.query(
        'SELECT * FROM `PawnPoints` WHERE `ID_Usuario` = ?',
        [u.id],
    function(err, results) {
      
      let usuario = results[0].ID_Usuario
      let Total = results[0].Total
      
      let u = client.users.cache.get(usuario)
      
      message.channel.send({embed: {
        title: `Puntaje de ${u.username}`,
        description: `**PawnPoints:** ${Total}`,
        thumbnail: {
          url: u.displayAvatarURL()
        }
      }})
      
    }
    
  );
  
}