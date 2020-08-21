module.exports = async (client, message, args) => {
  
  var moment = require("moment-timezone")
  
  let date = moment.tz(Date.now(), "America/Santo_Domingo").format("L - LT")
  message.channel.send(date)
  
  
}