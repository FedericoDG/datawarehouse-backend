const { getAllCities, getCity, saveCityOnDB, updateCityOnDB, deleteCityOnDB } = require('../helpers/cities.helpers');

const citiesGetAll = async (_, res) => {
  try {
    const cities = await getAllCities();
    const citiesMapped = cities.map((el) => ({ ...el, id: el.id_city, parent: el.name_country }));
    res.json({
      response: true,
      message: 'Lista de ciudades.',
      cities: citiesMapped
    });
  } catch (error) {
    res.status(500).json({
      response: false,
      message: 'Ha ocurrido un error.',
      error
    });
  }
};

const citiesGet = async (req, res) => {
  try {
    const city = await getCity(req.params.id);
    res.json({
      response: true,
      message: 'Detalle de ciudad.',
      city: city[0]
    });
  } catch (error) {
    res.status(500).json({
      response: false,
      message: 'Ha ocurrido un error.',
      error
    });
  }
};

const citiesCreate = async (req, res) => {
  try {
    const city = await saveCityOnDB(req.city);
    res.json({
      response: true,
      message: 'Ciudad creada.',
      country: { id_city: city.insertId, ...req.city }
    });
    city;
  } catch (error) {
    res.status(500).json({
      response: false,
      message: 'Ha ocurrido un error.',
      error
    });
  }
};

const citiesUpdate = async (req, res) => {
  try {
    await updateCityOnDB(req.city, req.params.id);
    res.json({
      response: true,
      message: 'Ciudad actualizada.',
      city: { id_city: req.params.id, ...req.city }
    });
  } catch (error) {
    res.status(500).json({
      response: false,
      message: 'Ha ocurrido un error.',
      error
    });
  }
};

const citiesDelete = async (req, res) => {
  try {
    await deleteCityOnDB(req.params.id);
    res.json({
      response: true,
      message: 'Ciudad eliminada.'
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
  citiesGetAll,
  citiesGet,
  citiesCreate,
  citiesUpdate,
  citiesDelete
};
