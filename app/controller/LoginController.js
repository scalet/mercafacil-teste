require("dotenv-safe").config();
const knex = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {

  async index(req,res) {

    const {email, pass} = req.body;


    console.log(email, pass);

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