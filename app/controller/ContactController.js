const knex = require('../models');

const list = async function (db) {
  const contacts = await db('contacts').column({name: 'nome'}, {cellphone: 'celular'}).select();
  return contacts;
}

const save = async function (db, contacts, res) {
  let invalid =[];
  let valid = [];

   contacts.forEach(contact => {
    //TO DO -> Set validation
    if ((!contact.name || contact.name == "") || (!contact.cellphone || contact.cellphone == "" || contact.cellphone.length != 13)) {
      invalid.push(contact)
      return
    }

    valid.push({nome:contact.name, celular:contact.cellphone});

  }); 

  const resDB = await db('contacts')
                      .insert(valid)
                      .catch((error) => {
                        return res.status(500).json({success: true, success: true, error:"Error at insert data"});
                      });

    return res.status(200).json({
      success: true,
      error: null,
      contacts: {
        sent: contacts.length,
        success: valid.length,
        failed: invalid.length
      }
    });
}

module.exports = {

  async listMacapa(req, res) {

    const contacts = await list(knex.dbMacapa);

    contacts.map(function (contact) {
      contact.cellphone = contact.cellphone.replace(/(\d{2})?(\d{2})?(\d{5})?(\d{4})/, "+$1 ($2) $3-$4");
      contact.name = contact.name.toUpperCase();
      return contact;
    });

    return res.json({contacts});
  },

  async saveMacapa(req, res) {

    const {contacts} = req.body;

    const responseDB = await save(knex.dbMacapa, contacts, res);

    return responseDB;
  },

  async listVarejao(req, res) {

    const contacts = await list(knex.dbVarejao);

    return res.json({contacts});
  },

  async saveVarejao(req, res) {

    const {contacts} = req.body;

    const responseDB = await save(knex.dbVarejao, contacts, res);

    return responseDB;
  }
}
