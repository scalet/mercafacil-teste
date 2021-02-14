const knexfile = require('../../knexfile');

const dbVarejao = require('knex')(knexfile.varejao);
const dbMacapa = require('knex')(knexfile.macapa);
const dbUser = require('knex')(knexfile.auth);


const knex = {
  dbVarejao,
  dbMacapa,
  dbUser
}
  
module.exports = knex