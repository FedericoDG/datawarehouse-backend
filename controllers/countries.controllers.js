const {
  getAllCountries,
  getCountry,
  saveCountryOnDB,
  updateCountryOnDB,
  deleteCountryOnDBB,
  deleteCountryOnDB
} = require('../helpers/countries.helpers');

const countriesGetAll = async (_, res) => {
  try {
    const countries = await getAllCountries();
    const countriesMapped = countries.map((el) => ({ ...el, id: el.id_country, parent: el.name_region }));
    res.json({
      response: true,
      message: 'Lista de países.',
      countries: countriesMapped
    });
  } catch (error) {
    res.status(500).json({
      response: false,
      message: 'Ha ocurrido un error.',
      error
    });
  }
};

const countriesGet = async (req, res) => {
  try {
    const country = await getCountry(req.params.id);
    res.json({
      response: true,
      message: 'Detalle de país.',
      country: country[0]
    });
  } catch (error) {
    res.status(500).json({
      response: false,
      message: 'Ha ocurrido un error.',
      error
    });
  }
};

const countriesCreate = async (req, res) => {
  try {
    const country = await saveCountryOnDB(req.country);
    res.json({
      response: true,
      message: 'País creado.',
      country: { id_country: country.insertId, ...req.country }
    });
  } catch (error) {
    res.status(500).json({
      response: false,
      message: 'Ha ocurrido un error.',
      error
    });
  }
};

const countriesUpdate = async (req, res) => {
  try {
    await updateCountryOnDB(req.country, req.params.id);
    res.json({
      response: true,
      message: 'País actualizado.',
      country: { id_country: req.params.id, ...req.country }
    });
  } catch (error) {
    res.status(500).json({
      response: false,
      message: 'Ha ocurrido un error.',
      error
    });
  }
};

const countriesDelete = async (req, res) => {
  try {
    await deleteCountryOnDB(req.params.id);
    res.json({
      response: true,
      message: 'País eliminado.'
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
  countriesGetAll,
  countriesGet,
  countriesCreate,
  countriesUpdate,
  countriesDelete
};
