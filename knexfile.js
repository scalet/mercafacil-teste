// Update with your config settings.

module.exports = {
  macapa: {
    client: 'mysql',
    connection: {
      host:"0.0.0.0",
      database: "macapa",
      user:"admin",
      password:"admin"
    }
  },
  varejao: {
    client: 'pg',
    connection: {
      host:"0.0.0.0",
      database: "varejao",
      user:"admin",
      password:"admin"
    }
  },
  user: {
    client: 'pg',
    connection: {
      host:"0.0.0.0",
      database: "user",
      user:"admin",
      password:"admin"
    }
  }  
};
