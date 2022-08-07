const { getAllCompanies, getCompany, saveCompanyOnDB, updateCompanyOnDB, deleteCompanyOnDB } = require('../helpers/companies.helpers');

const companiesGetAll = async (_, res) => {
  try {
    const companies = await getAllCompanies();
    const companyMapped = companies.map((el) => ({ ...el, id: el.id_company }));
    res.json({
      response: true,
      message: 'Lista de compañías.',
      companies: companyMapped
    });
  } catch (error) {
    res.status(500).json({
      response: false,
      message: 'Ha ocurrido un error.',
      error
    });
  }
};

const companiesGet = async (req, res) => {
  try {
    const company = await getCompany(req.params.id);
    res.json({
      response: true,
      message: 'Detalle de compañía.',
      company: company[0]
    });
  } catch (error) {
    res.status(500).json({
      response: false,
      message: 'Ha ocurrido un error.',
      error
    });
  }
};

const companiesCreate = async (req, res) => {
  try {
    const company = await saveCompanyOnDB(req.company);
    res.json({
      response: true,
      message: 'Compañía creada.',
      company: { id_company: company.insertId, ...req.company }
    });
  } catch (error) {
    res.status(500).json({
      response: false,
      message: 'Ha ocurrido un error.',
      error
    });
  }
};

const companiesUpdate = async (req, res) => {
  try {
    await updateCompanyOnDB(req.company, req.params.id);
    res.json({
      response: true,
      message: 'Compañía actualizada.',
      company: { id_company: req.params.id, ...req.company }
    });
  } catch (error) {
    res.status(500).json({
      response: false,
      message: 'Ha ocurrido un error.',
      error
    });
  }
};

const companiesDelete = async (req, res) => {
  try {
    await deleteCompanyOnDB(req.params.id);
    res.json({
      response: true,
      message: 'Compañía eliminada.'
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
  companiesGetAll,
  companiesGet,
  companiesCreate,
  companiesUpdate,
  companiesDelete
};
