let cooldown= new Set();
const mysql = require("mysql2")
const { niveles } = require("../niveles.js");

let conteo = new Set()

module.exports = (client, message) => { 


  
 if(message.channel.type !== "dm" && message.guild.id === "740706004869578816" && message.author.id !== "740713247639863428") {
    
    if(cooldown.has(message.author.id)){
     message.channel.send(`**<@${message.author.id}> No escribas tan rapido.**`).then(msg => {
       message.delete()
       msg.delete({timeout: 1000})
     })
     return;
    }

    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 1000);
  
  }

  if(message.author.bot && message.author.id !== "723731695475621908") return;
  if(!message.content.startsWith(client.config.prefix)) {
    niveles(message)
    
    if(message.author.id !== "740713247639863428") {
      
    const links = ["discord.gg/", "discord.me/", "discord.io/", "discordapp.com/invite"]

    let conteo2 = 0
    let total = conteo2 + 1;
    conteo.set(message.author.id, total)
    
    if(links.some(word =>

      message.content.toLowerCase().includes(word))){
        message.delete({ timeout : 100})

        message.reply('No se permiten invitaciones en este servidor.').then(response =>{

        response.delete({ timeout : 1000})

        });
      } else {
        
        let total2 = conteo.get(message.author.id)
        if(total2 > 0)
          {
            conteo.set(message.author.id, 0)
          }
      }
    }
    return;
  }; 

  // Definiendo los argumentos y comandos.
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);  
  const command = args.shift().toLowerCase()

  // Manejando los eventos.
  let cmd = client.comandos.get(command); // Obtiene el comando de la colección client.commandos
  if(!cmd) return; // Si no hay comandos no ejecute nada.
  
  const connection = mysql.createConnection({
  host: client.config.DBHost,
  user: client.config.DBUser,
  database: client.config.DBName,
  password: client.config.DBPass
});
  
  // Ejecuta el comando enviando el client, el mensaje y los argumentos.
  cmd(client, message, args, connection);
  

}