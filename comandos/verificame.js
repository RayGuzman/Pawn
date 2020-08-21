const db = require("megadb")

module.exports = async (client, message, args) => {
  
      let member = message.member
    let user = message.author
    if(message.channel.id !== "740707934358732861") return;
    let codigo = new db.crearDB("codigos")
    
    if(!codigo.tiene(`${user.id}`)) {
      return message.channel.send("No tienes un codigo de Verificacion").then(co => {
      co.delete({ timeout : 5000 })
    }); 
    }
    let texto = args[0]
    if(!texto) return message.channel.send("Debes escribir tu codigo de Verificacion").then(m => {
    });
    let codi = await codigo.obtener(user.id) //Aca
    // if(!codi === texto) return message.channel.send("El Codigo es Incorrecto")
    if(texto === codi){
      message.channel.send(`<@${user.id}> **Bienvenid@, recuerda leer <#740708664276549632>**`)
        member.roles.add("740718166539370537").catch(e => message.reply("**Ah sucedido un error.** Intentalo nuevamente, Si el problema persiste contacta a un Administrador"))
        codigo.delete(user.id)
    }else return message.channel.send(":x: **Codigo Incorrecto** :x:")
  
}