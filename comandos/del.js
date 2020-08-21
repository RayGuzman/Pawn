module.exports = async (client, message, args) => {
  
  message.channel.createWebhook('Some-username', {
	avatar: 'https://i.imgur.com/wSTFkRM.png',
}).then(webhook => console.log(`Created webhook ${webhook}\nID:${webhook.id}\n${webhook.webhokID} `)).catch(console.error);
}