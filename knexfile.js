// Update with your config settings.

module.exports = {
  macapa: {
    client: 'mysql',
    connection: {
      host:"dbmysql",
      database: "macapa",
      user:"admin",
      password:"admin"
    }
  },
  varejao: {
    client: 'pg',
    connection: {
      host:"dbpostgres",
      database: "varejao",
      user:"admin",
      password:"admin"
    }
  },
  auth: {
    client: 'pg',
    connection: {
      host:"dbpostgres",
      database: "auth",
      user:"admin",
      password:"admin"
    }
  }  
};
