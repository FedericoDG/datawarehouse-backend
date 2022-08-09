// FUNCIÓN PARA FILTRAR CONTACTOS

const filterFunction = (contacts, filtro) => {
  contacts = JSON.parse(JSON.stringify(contacts));
  filtro = filtro.toLowerCase();
  return contacts.filter(
    (el) =>
      el.name?.toLowerCase().includes(filtro) ||
      el.lastname?.toLowerCase().includes(filtro) ||
      el.email?.split('@')[0].toLowerCase().includes(filtro) ||
      el.email?.split('@')[1].toLowerCase().includes(filtro) ||
      el.region_name?.toLowerCase().includes(filtro) ||
      el.country_name?.toLowerCase().includes(filtro) ||
      el.city_name?.toLowerCase().includes(filtro) ||
      el.company_name?.toLowerCase().includes(filtro) ||
      el.phone?.toLowerCase().includes(filtro) ||
      el.position?.toLowerCase().includes(filtro) ||
      (el.linkedin?.toLowerCase().includes(filtro) && el.preference_linkedin === 2) ||
      (el.facebook?.toLowerCase().includes(filtro) && el.preference_facebook === 2) ||
      (el.twitter?.toLowerCase().includes(filtro) && el.preference_twitter === 2) ||
      (el.instagram?.toLowerCase().includes(filtro) && el.preference_instagram === 2)
  );
};

module.exports = { filterFunction };
