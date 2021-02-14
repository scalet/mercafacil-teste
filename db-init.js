const knex = require('./app/models');

async function createDatabase() {
  //Creating Varejao Table
  await knex.dbVarejao.raw("CREATE table contacts (id serial PRIMARY KEY, nome VARCHAR ( 100 ) NOT NULL, celular VARCHAR ( 13 ) NOT NULL);");

  //Creating User Table
  await knex.dbUser.raw("CREATE TABLE users(id serial PRIMARY KEY, email varchar (50) NOT NULL, pass varchar (50) NOT NULL, role varchar(10) NOT NULL,token varchar (250));");

  //Seeding users
  let logins = [];
  logins.push({'email': 'varejao@mercafacil.com.br', 'pass': 'varejao', 'role': 'varejao'});
  logins.push({'email': 'macapa@mercafacil.com.br', 'pass': 'macapa', 'role': 'macapa'});
  await knex.dbUser('users').insert(logins);

}

createDatabase();