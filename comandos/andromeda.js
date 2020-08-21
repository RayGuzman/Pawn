module.exports = async (client, message, args, connection) => {
  
  setInterval(() => {
    
  let usuario = client.users.cache.filter(x => !x.bot).random()
  
  connection.query(
  'SELECT * FROM `PawnPoints` WHERE `ID_Usuario` = ?',
  [usuario.id],
  function(err, results) {
    
    if(results[0] === undefined)
    {
           connection.query(
          'INSERT INTO `PawnPoints` (`ID_Usuario`) VALUES (?)',
          [usuario.id]);
          message.channel.send("Añadido: " + usuario.username)
    
    } else {
      message.channel.send(usuario.username)
    }
  
  }
    
  );
  }, 1000)
}