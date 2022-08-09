const express = require('express');
const cors = require('cors');
require('dotenv').config();

const dataBase = require('../database/connection');

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.EXPRESS_PORT || 3000;
    this.usersPath = '/v1/users';
    this.contactsPath = '/v1/contacts';
    this.companiesPath = '/v1/companies';
    this.regionsPath = '/v1/regions';
    this.countriesPath = '/v1/countries';
    this.citiesPath = '/v1/cities';
    this.preferencesPath = '/v1/preferences';

    this.middlewares();
    this.routes();
    this.connection();
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.static('public'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }
  routes() {
    this.app.use(this.usersPath, require('../routes/users.routes.js'));
    this.app.use(this.contactsPath, require('../routes/contacts.routes.js'));
    this.app.use(this.companiesPath, require('../routes/companies.routes'));
    this.app.use(this.regionsPath, require('../routes/regions.routes'));
    this.app.use(this.countriesPath, require('../routes/countries.routes'));
    this.app.use(this.citiesPath, require('../routes/cities.routes'));
    this.app.use(this.preferencesPath, require('../routes/preferences.routes'));
  }
  connection() {
    dataBase.connect((error) => {
      if (error) {
        throw new Error(error);
      }
      console.log(`Connected to database: ${process.env.MARIADB_DATABASE}`);
    });
  }
  listen() {
    this.app.listen(this.PORT, () => {
      console.clear();
      console.log('API live on port', this.PORT);
    });
  }
}

module.exports = Server;
