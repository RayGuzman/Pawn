//ESTE CODIGO NO AFECTARA SU BOT, SCRIPT DE ARRANQUE

const express = require("express");
const app = express();
app.get('/src', (req, res) => res.render('index', { client }))
app.set("view engine", "ejs")
app.set("views", __dirname + "/src/");
app.use(express.static(__dirname + '/src/'))
app.get('/', (req, res) => res.render('index', { client }))
app.get('/verificar', (req, res) => res.render('verificar', { client }))
app.listen(process.env.PORT);


//DESDE AQUI EMPIEZA A ESCRIBIR EL CODIGO PARA SU BOT

const Discord = require("discord.js");
const client = new Discord.Client();
let { readdirSync } = require("fs");
client.config = require("./config.js");
client.comandos = new Discord.Collection();

//Controlador de Comandos

for (const file of readdirSync('./comandos/')) { 
	if (file.endsWith(".js")) {
    
	let fileName = file.substring(0, file.length - 3);

	let fileContents = require(`./comandos/${file}`); 
	client.comandos.set(fileName, fileContents);
  }
}


for (const file of readdirSync('./eventos/')) { 
	if (file.endsWith(".js")) {
	let fileName = file.substring(0, file.length - 3);

	let fileContents = require(`./eventos/${file}`);

	client.on(fileName, fileContents.bind(null, client));
	delete require.cache[require.resolve(`./eventos/${file}`)];

}
    
}


//Propiedad Login

client.login(client.config.token)
  .then(() => {
    console.log(`Funcionando.`)
  })
  .catch((err) => {
    console.log(`Ocurrio un Error: ${err}`)
  })

