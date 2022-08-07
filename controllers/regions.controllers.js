const { getAllRegions, getRegion, saveRegionOnDB, updateRegionOnDB, deleteRegionOnDB } = require('../helpers/regions.helpers');

const regionsGetAll = async (_, res) => {
  try {
    const regions = await getAllRegions();
    const regionsMapped = regions.map((el) => ({ ...el, id: el.id_region }));
    res.json({
      response: true,
      message: 'Lista de regiones.',
      regions: regionsMapped
    });
  } catch (error) {
    res.status(500).json({
      response: false,
      message: 'Ha ocurrido un error.',
      error
    });
  }
};

const regionsGet = async (req, res) => {
  try {
    const region = await getRegion(req.params.id);
    res.json({
      response: true,
      message: 'Detalle de región.',
      region: region[0]
    });
  } catch (error) {
    res.status(500).json({
      response: false,
      message: 'Ha ocurrido un error.',
      error
    });
  }
};

const regionsCreate = async (req, res) => {
  try {
    const region = await saveRegionOnDB(req.region);
    res.json({
      response: true,
      message: 'Región creada.',
      region: { id_region: region.insertId, ...req.region }
    });
  } catch (error) {
    res.status(500).json({
      response: false,
      message: 'Ha ocurrido un error.',
      error
    });
  }
};

const regionsUpdate = async (req, res) => {
  try {
    await updateRegionOnDB(req.region, req.params.id);
    res.json({
      response: true,
      message: 'Región actualizada.',
      region: { id_region: req.params.id, ...req.region }
    });
  } catch (error) {
    res.status(500).json({
      response: false,
      message: 'Ha ocurrido un error.',
      error
    });
  }
};

const regionsDelete = async (req, res) => {
  try {
    await deleteRegionOnDB(req.params.id);
    res.json({
      response: true,
      message: 'Región eliminada.'
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
  regionsGetAll,
  regionsGet,
  regionsCreate,
  regionsUpdate,
  regionsDelete
};
