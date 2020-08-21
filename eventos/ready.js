                                                                   const mysql = require("mysql2")

module.exports = (client) => {
  
  client.user.setPresence( 
    {
      status: "online", 
      game: { 
        name: '!ping pong', 
        url: null, // Establece el enlace del juego si el tipo es "STREAMING".
        type: "PLAYING"
      }
    }
  );
                                                                                                                   
  setInterval(() => {
    client.channels.cache.get("741559191604297768").send("!ping")
  }, 10000)
  
  const connection = mysql.createConnection({
  host: client.config.DBHost,
  user: client.config.DBUser,
  database: client.config.DBName,
  password: client.                                                                                                                                                                                                config.DBPass
});
  
}