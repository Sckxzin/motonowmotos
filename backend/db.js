const oracledb = require("oracledb");

// usar OBJETO (mais limpo)
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function conectar() {
  return await oracledb.getConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECTION_STRING
  });
}

module.exports = conectar;
