const db = require("megadb")
const levels_db = new db.crearDB("nivel")
const { join } = require("path");
const { MessageAttachment } = require("discord.js")
const { createCanvas, loadImage } = require("canvas")

module.exports = async (client, message, args) => {

   let mencion = message.mentions.members.first() || message.member;
  
  if(!levels_db.tiene(`${message.guild.id}.${mencion.id}`)) return message.channel.send("Este usuario no tiene Nivel ni Experiencia")
   
    let { xp, nivel } = await levels_db.obtener(`${mencion.guild.id}.${mencion.id}`)
    
    let levelup = 5 * (nivel ** 2) + 50 * nivel + 100
    
    

    const canvas = createCanvas(1000, 333);
    const ctx = canvas.getContext("2d");
    const backround = await loadImage("https://i.pinimg.com/originals/35/fc/6d/35fc6d2eb7e5699141131a21ede99113.jpg")

    ctx.drawImage(backround, 0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#ffffff";
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = "#000000";
    ctx.fillRect(180, 216, 770, 65);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeRect(180, 216, 770, 65);
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.globalAlpha = 0.6;
    ctx.fillRect(180, 216, ( xp / levelup * 100 ) * 7.7, 65);
    ctx.fill()
    ctx.globalAlpha = 1;

    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${xp} / ${levelup} XP`, 600,260);

    ctx.textAlign = "left";
    ctx.fillText(mencion.user.tag, 300, 120);

    ctx.font = "50px Arial";
    ctx.fillText("Nivel:", 300, 180);
    ctx.fillText(nivel, 470, 180);

    ctx.arc(170, 160, 120, 0, Math.PI * 2, true);
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    const avatar = await loadImage(mencion.user.displayAvatarURL({ format : "jpg" }));
    ctx.drawImage(avatar, 40, 40, 250, 250);

    const attacment = new MessageAttachment(canvas.toBuffer(), "rank.png");
    message.channel.send(`Rank del Usuario **${mencion.user.username}**`, attacment);

}
