const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

const { Sequelize } = require("sequelize");

let sequelize;

if(process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL)
} else {
  sequelize = new Sequelize(
    database, 
    username, 
    password, 
    {
    host,
    dialect: "mysql",
    port: 3306,
    
});
}

const dbConnectMysql = async () => {
  try {
    await sequelize.authenticate();
    console.log("MYSQL Conexión correcta");
  } catch (error) {
    console.log("MYSQL Error de conexión", error);
  }
};

module.exports = { sequelize, dbConnectMysql };
