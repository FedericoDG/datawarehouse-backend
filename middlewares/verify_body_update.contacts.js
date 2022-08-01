// MIDDLEWARE PARA COMPROBAR EL BODY AL ACTUALIZAR UN NUEVO CONTACTO (se utilizan algunas expresiones regulares)
const checkName = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]{3,50}$/; // Letras mayúsculas y minúsculas, y espacios. Longitud entre 4 y 50 caracteres
const checkEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Formato de email válido

const verifyBodyUpdateContact = async (req, res, next) => {
  let { name, lastname, email, address, phone, preference_phone, linkedin, preference_linkedin, facebook, preference_facebook, twitter, preference_twitter, instagram, preference_instagram, position, interest, id_company, id_city } = req.body;
  if (!name || !lastname || !email || !address || !phone || !preference_phone ||!linkedin || !preference_linkedin || !facebook || !preference_facebook || !twitter || !preference_twitter || !instagram || !preference_instagram || !position || !interest || !id_company || !id_city) {
    return res.status(400).json({
      response: false,
      message: 'Todos los campos son obligatorios: name, lastname, email, address, phone, linkedin, preference_linkedin, facebook, preference_facebook, twitter, preference_twitter, instagram, preference_instagram, position, interest, id_company, id_city.'
    });
  }
  if (!checkName.test(name)) {
    return res.status(400).json({
      response: false,
      message: 'El campo name debe tener al menos 3 caracteres, no más de 50, y no debe contener números ni caracteres especiales, salvo espacios.'
    });
  }
  if (!checkName.test(lastname)) {
    return res.status(400).json({
      response: false,
      message: 'El campo lastname debe tener al menos 3 caracteres, no más de 50, y no debe contener números ni caracteres especiales, salvo espacios.'
    });
  }
  email = email.toLowerCase();
  if (!checkEmail.test(email)) {
    return res.status(400).json({
      response: false,
      message: 'El campo email deber contener un email válido.'
    });
  }
  req.contact = {
    name, lastname, email, address, phone, preference_phone, linkedin, preference_linkedin, facebook, preference_facebook, twitter, preference_twitter, instagram, preference_instagram, position, interest, id_company, id_city
  };
  next();
};

module.exports = verifyBodyUpdateContact;