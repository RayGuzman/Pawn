const moment = require("moment")
module.exports = async (client, message, args, connection) => {
  
  let perm = message.member.roles.cache.has("740731670780575865")
  if(!perm) return
  
  let usuario = args.join(" ")
  
  let u = client.users.cache.get(usuario)
  if(!u) return message.channel.send("**Usuario no Encontrado.**")
  
  connection.query(
        'SELECT * FROM `PawnPoints` WHERE `ID_Usuario` = ?',
        [u.id],
    function(err, results) {
    
      let us = results[0].Total;
    
      let uc = us + 2
      
      let texto = ``
      
      let texto2 = ``
      
      
      connection.query(
        'UPDATE PawnPoints SET `Total`=? WHERE `ID_Usuario` = ?',
        [uc, u.id]
      );
      
      var moment = require("moment-timezone")
  
      let date = moment.tz(Date.now(), "America/Santo_Domingo").format("L - LT")
      
      connection.query(
        'INSERT INTO `log_PawnPoints` (`Usuario1`, `Usuario2`, `fecha`) VALUES (?, ?, ?)',
        [message.author.id, u.id, date]);
      
      
      u.send(`**<a:verif:740784683964432415> ¡Felicidades! <@${u.id}>, recibiste 2 PawnPoints. <a:verif:740784683964432415> \n\n <a:ariel1:740743721431334963> Recuerda que estos te ayudaran a destacar y a obtener distintos roles en el servidor. <a:ariel1:740743721431334963> **`)
      client.channels.cache.get("740728453464064072").send(`**<a:verificado:740752636390932531> ¡El Usuario <@${u.id}> recibio 2 PawnPoints! <a:verificado:740752636390932531> \n <a:pin2:740764345775947797> Estos lo ayudaran a destacar en el servidor y a obtener diversos Roles en el servidor. <a:pin2:740764345775947797>**`)
      
    }
  
  );
  
}