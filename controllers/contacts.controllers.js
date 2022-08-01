const { getAllContacts, getOneContact, saveContactOnDB, updateContactOnDB, deleteContactoOnDB } = require("../helpers/contacts.helpers");

const contactsGetAll = async (_, res) => {
  try {
    const contacts = await getAllContacts();
    res.json({
      response: true,
      message: 'Lista de contactos.',
      contacts
    });
  } catch (error) {
    res.status(500).json({
      response: false,
      message: 'Ha ocurrido un error.',
      error
    });
  }
};
const contactsGet = async (req, res) => {
  try {
    const contact = await getOneContact(req.params.id);
    res.json({
      response: true,
      message: 'Detalle de contacto.',
      contact: contact[0]
    });
  } catch (error) {
    res.status(500).json({
      response: false,
      message: 'Ha ocurrido un error.',
      error
    });
  }
};

const contactsCreate = async (req, res) => {
  try {
    const contact = await saveContactOnDB(req.contact);
    res.json({
      response: true,
      message: 'Contacto creado.',
      contact: {id_contact: contact.insertId, ...req.contact}
    });
  } catch (error) {
    res.status(500).json({
      response: false,
      message: 'Ha ocurrido un error.',
      error
    });
  }
};

const contactsUpdate = async (req, res) => {
  try {
    await updateContactOnDB(req.contact, req.params.id);
    res.json({
      response: true,
      message: 'Contacto actualizado.',
      contact: {id_contact: req.params.id, ...req.contact}
    });
  } catch (error) {
    res.status(500).json({
      response: false,
      message: 'Ha ocurrido un error.',
      error
    });
  }
};

const contactsDelete = async (req, res) => {
  try {
    await deleteContactoOnDB(req.params.id);
    res.json({
      response: true,
      message: 'Usuario eliminado.'
    });
  } catch (error) {
    res.status(500).json({
      response: false,
      message: 'Ha ocurrido un error.',
      error
    });
  }
};


module.exports = {
  contactsGetAll,
  contactsGet,
  contactsCreate,
  contactsUpdate,
  contactsDelete
}