require("dotenv-safe").config();
const knex = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {

  async init (req,res) {
    const {token} = req.body;

    console.log(process.env.DB_INIT_HASH);
    if (token == process.env.DB_INIT_HASH) {
      require('./../../db-init');

      return res.status(200).json({msg: "olha a gambi"});

      process.env.DB_INIT_HASH = Date.now();
      console.log(process.env.DB_INIT_HASH);

    } else {
      return res.status(401).json();
    }
  },

  async index(req,res) {

    const {email, pass} = req.body;

    if (email == '' || pass == '') {
      return res.status(401).json({error:"Missing email or password"});
    }

    // busca o usuario no banco de dados
    const [id] = await knex.dbUser('users').where({
      email: email,
      pass:  pass
    }).select('id');

    

    //retorna erro se nao encontrar o usuario
    if (!id) {
      return res.status(404).json({
        error: "User or Password incorrect."
      });
    }
    
    const user_id = id.id;

    // cria o JWT
    const token = jwt.sign({ user_id }, process.env.SECRET, {
      expiresIn: 3600 // expira em 1 hora
    });

    await knex.dbUser('users')
              .where('id', '=',user_id)
              .update({token});

    return res.json({ auth: true, token: token });
  }
}