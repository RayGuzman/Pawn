const db = require("megadb")

function Texto() {
	var caracteres = "abcdefghjkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ012346789";
	var contraseña = "";
	for (var i = 0; i < 24; i++)
	  contraseña += caracteres.charAt(
		Math.floor(Math.random() * caracteres.length)
	  );
	return contraseña;
  }

module.exports = async (client, message, args) => {
  
  let perm = message.member.roles.cache.has("740718166539370537")
  
  if(perm) return;
  
  let user = message.author
    let codigo = new db.crearDB("codigos")
    if(message.channel.id !== "740707934358732861") return;
    if(codigo.tiene(`${user.id}`)) {
    message.channel.send("Ya tienes un codigo de Verificacion.**")
    return;
    }
    let contraseñ = Texto()
    
		message.author.send(`Tu **Codigo** de Verificacion es **${contraseñ}**`).catch(err => {
      message.channel.send("**No puedo mandarte un Mensaje Privado, habla con un Administrador**")
    })
  
    console.log(`El usuario ${message.author.tag} hizo que se se le mandara un codigo el cual es ${contraseñ}`)
    let resultado = message.channel.send("Te envie tu codigo de Verificacion por MD").then(m => {
      m.delete({ timeout : 5000 })
    })
    codigo.establecer(`${user.id}`, `${contraseñ}`)
  
}