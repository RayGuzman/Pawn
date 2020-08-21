const mysql = require("mysql2")
module.exports = async (client, member) => {
  
  const connection = mysql.createConnection({
  host: client.config.DBHost,
  user: client.config.DBUser,
  database: client.config.DBName,
  password: client.config.DBPass
});
  
  let usuario = member.id
  
  connection.query(
        'INSERT INTO `PawnPoints` (`ID_Usuario`) VALUES (?)',
        [usuario],
  
    
  );
  
}