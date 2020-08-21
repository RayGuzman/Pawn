const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("megadb");

let levels_db = new db.crearDB("nivel");

let Cooldownniveles = new Map();

module.exports = {
  niveles: async (message) => {
  if(message.channel.type == "dm") return;
    
    if(message.content.length <= 5) return;


    if(!levels_db.tiene(message.guild.id)) levels_db.establecer(message.guild.id, {})
    if(!levels_db.tiene(`${message.guild.id}.${message.author.id}`)) levels_db.establecer(`${message.guild.id}.${message.author.id}`, {xp: 0, nivel: 0})
    let { xp, nivel } = await levels_db.obtener(`${message.guild.id}.${message.author.id}`)
    let randomxp = Math.floor(Math.random() * 15) + 2
    let levelup = 5 * (nivel ** 2) + 50 * nivel + 100
    
    if((xp + randomxp) >= levelup) {
    levels_db.establecer(`${message.guild.id}.${message.author.id}`, {xp: 0, nivel: parseInt(nivel+1)});
      Cooldownniveles.set(message.guild.id+message.author.id, Date.now() + 10000)

      const Zeew = require("zeew");
       var server = message.guild;


       let nivel2 = new Zeew.Bienvenida()

     .token("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InVzZXJuYW1lIjoiS2FzaF9TYW50YW5hIiwiaWREaXNjb3JkIjoiNTQxMDcyODMxNjUyMjk4NzUyIn0sImlhdCI6MTU5NTcwOTE4OX0.jDL9bnqlNLMloLmiCEXwAYZSdr-s06gwLaebU6NjfQY")

     .avatar(message.member.user.displayAvatarURL({format: "png"}))

     .fondo(
       "https://png.pngtree.com/thumb_back/fw800/background/20190223/ourmid/pngtree-full-anime-style-technology-city-architecture-background-image_68040.jpg"
     )

     .colorTit("")

     .estilo("classic")

     .titulo(`El usuario ${message.member.user.username} paso de nivel`)

     .colorDesc("11935C")

     .descripcion(`Pasaste al Nivel **${parseInt(nivel+1)}**`);

        let img = await Zeew.WelcomeZeew(nivel2);

     const canal_nivel = new db.crearDB("canal_nivel")
     const id = await canal_nivel.get(message.guild.id)

     message.guild.channels.cache.get(`${id}`).send({ files: [img] });
    console.log(`${message.author.tag}, Paso al nivel ${parseInt(nivel+1)}`)

    }
    else{
      
      console.log(`${message.author.username} gano ${randomxp}, ahora tiene ${xp + randomxp}/${levelup} y esta en el nivel ${nivel}`)
      levels_db.sumar(`${message.guild.id}.${message.author.id}.xp`, randomxp)
      
      
      return;
    }
  },
  
  getRank: (users, message) => {
  
    let userlist = []
    
    for(var key in users) {
      let usuario = message.guild.members.cache.has(key) ? message.guild.members.cache.get(key).user.tag : `${key} -- **Salio**`
     userlist.push([usuario, users[key].nivel, users[key].xp])
    }
    
    
    userlist.sort((user1, user2) => {
      return user2[1] - user1[1] || user2[2] - user1[2]
    })
    
    return userlist
    
}
  
}