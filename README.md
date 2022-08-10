![Logo](https://nazgul.com.ar/images/datawarehouse_backend.png)

# Data Warehouse - Backend

REST API desarrollada en Node.js para un sistema que permite el manejo de contactos.

## Autor

- [Federico González](https://www.linkedin.com/in/fededg/)

## Instalación

**Es requisito previo tener instalado en el sistema Node.js y MySQL (o MariaDB).**

- Crear una base de datos llamada: **datawarehouse**

- Clonar el repositorio:

```bash
  git clone https://github.com/FedericoDG/datawarehouse-backend.git
```

- Instalar las dependencias del proyecto:

```bash
  npm install
```

- Renombrar el archivo ".env.example" a "**.env**". Adicionalmente pude cambiar la información del mismo en caso de ser necesario.

- Iniciar el servidor:

```bash
  npm start
```

- Regenrar la base de datos haciendo un petición GET, mediante el navegador o Postman a la siguiente URL:

```bash
  http://localhost:3005/seed
```

- **CONTINUAR CON LA INSTALACIÓN DEL [FRONTEND](https://github.com/FedericoDG/datawarehouse-frontend)**

## API Reference

#### Login

```http
  POST /v1/login
```

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. Your email    |
| `password` | `string` | **Required**. Your password |

#### Create a user

```http
  POST /v1/register
```

| Headers         | Type     | Description                |
| :-------------- | :------- | -------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

| Parameter  | Type     | Description                  |
| :--------- | :------- | :--------------------------- |
| `email`    | `string` | **Required**. User email     |
| `password` | `string` | **Required**. User password  |
| `role`     | `string` | **Required**. User role      |
| `name`     | `string` | **Required**. User name      |
| `lastname` | `string` | **Required**. User last name |

#### Get all users

```http
  GET /v1/users
```

| Headers         | Type     | Description                |
| :-------------- | :------- | -------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

#### Get a user

```http
  GET /v1/users/${id}
```

| Headers         | Type     | Description                |
| :-------------- | :------- | -------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

| Parameter | Type     | Description           |
| :-------- | :------- | :-------------------- |
| `id`      | `number` | **Required**. User id |

#### Update a user

```http
  PUT /v1/users/${id}
```

| Headers         | Type     | Description                |
| :-------------- | :------- | -------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

| Parameter  | Type     | Description                  |
| :--------- | :------- | :--------------------------- |
| `id`       | `number` | **Required**. User id        |
| `email`    | `string` | **Required**. User email     |
| `password` | `string` | **Required**. User password  |
| `role`     | `string` | **Required**. User role      |
| `name`     | `string` | **Required**. User name      |
| `lastname` | `string` | **Required**. User last name |

#### Delete a user

```http
  DELETE /v1/register/${id}
```

| Headers         | Type     | Description                |
| :-------------- | :------- | -------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

| Parameter | Type     | Description           |
| :-------- | :------- | :-------------------- |
| `id`      | `number` | **Required**. User id |

#### Get all contacts

```http
  GET /v1/contacts
```

| Headers         | Type     | Description                |
| :-------------- | :------- | -------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

#### Get a contact

```http
  GET /v1/contacts/${id}
```

| Headers         | Type     | Description                |
| :-------------- | :------- | -------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

| Parameter | Type     | Description           |
| :-------- | :------- | :-------------------- |
| `id`      | `string` | **Required**. User id |

#### Create a contact

```http
  POST /v1/contacts
```

| Headers         | Type     | Description                |
| :-------------- | :------- | -------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

| Parameter              | Type     | Description                               |
| :--------------------- | :------- | :---------------------------------------- |
| `name`                 | `string` | **Required**. Contact name                |
| `lastname`             | `string` | **Required**. Contact last name           |
| `email`                | `string` | **Required**. Contact email               |
| `id_city`              | `number` | **Required**. Contact city id             |
| `address`              | `string` | **Required**. Contact address             |
| `id_company`           | `number` | **Required**. Contact company id          |
| `position`             | `string` | **Required**. Contact position            |
| `interest`             | `number` | **Required**. Contact interest            |
| `phone`                | `string` | **Optional**. Contact phone               |
| `phone_preference`     | `number` | **Optional**. Contact phone preference    |
| `linkedin`             | `string` | **Optional**. Contact LinkedIn profile    |
| `linkedin_preference`  | `number` | **Optional**. Contact LinkedIn preference |
| `facebook`             | `string` | **Optional**. Contact Facebook profile    |
| `facebook_preference`  | `number` | **Optional**. Contact Facebook preference |
| `twitter`              | `string` | **Optional**. Contact Twitter profile     |
| `twitter_preference`   | `number` | **Optional**. Contact Twitter preference  |
| `instagram`            | `string` | **Optional**. Contact Instagram profine   |
| `instagram_preference` | `number` | **Optional**. Contact Intagram preference |

- preference id: **1**, **2** or **3**. (default, favourite channel, do not disturb).

#### Update a contact

```http
  PUT /v1/contacts/${id}
```

| Headers         | Type     | Description                |
| :-------------- | :------- | -------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

| Parameter              | Type     | Description                               |
| :--------------------- | :------- | :---------------------------------------- |
| `id`                   | `number` | **Required**. Contact id                  |
| `name`                 | `string` | **Required**. Contact name                |
| `lastname`             | `string` | **Required**. Contact last name           |
| `email`                | `string` | **Required**. Contact email               |
| `id_city`              | `number` | **Required**. Contact city id             |
| `address`              | `string` | **Required**. Contact address             |
| `id_company`           | `number` | **Required**. Contact company id          |
| `position`             | `string` | **Required**. Contact position            |
| `interest`             | `number` | **Required**. Contact interest            |
| `phone`                | `string` | **Optional**. Contact phone               |
| `phone_preference`     | `number` | **Optional**. Contact phone preference    |
| `linkedin`             | `string` | **Optional**. Contact LinkedIn profile    |
| `linkedin_preference`  | `number` | **Optional**. Contact LinkedIn preference |
| `facebook`             | `string` | **Optional**. Contact Facebook profile    |
| `facebook_preference`  | `number` | **Optional**. Contact Facebook preference |
| `twitter`              | `string` | **Optional**. Contact Twitter profile     |
| `twitter_preference`   | `number` | **Optional**. Contact Twitter preference  |
| `instagram`            | `string` | **Optional**. Contact Instagram profine   |
| `instagram_preference` | `number` | **Optional**. Contact Intagram preference |

- preference id: **1**, **2** or **3**. (default, favourite channel, do not disturb).

#### Delete a contact

```http
  DELETE /v1/contacts/${id}
```

| Headers         | Type     | Description                |
| :-------------- | :------- | -------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `id`      | `number` | **Required**. Contact id |

#### Get all companies

```http
  GET /v1/companies/
```

| Headers         | Type     | Description                |
| :-------------- | :------- | -------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

#### Get a company

```http
  GET /v1/companies/${id}
```

| Headers         | Type     | Description                |
| :-------------- | :------- | -------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `id`      | `number` | **Required**. Company id |

#### Create a company

```http
  POST /v1/companies
```

| Headers         | Type     | Description                |
| :-------------- | :------- | -------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `name`    | `string` | **Required**. Company name    |
| `phone`   | `string` | **Required**. Company phone   |
| `email`   | `string` | **Required**. Company email   |
| `address` | `string` | **Required**. Company address |
| `id_city` | `number` | **Required**. Company city id |

#### Update a company

```http
  PUT /v1/companies/${id}
```

| Headers         | Type     | Description                |
| :-------------- | :------- | -------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `id`      | `number` | **Required**. Company id      |
| `name`    | `string` | **Required**. Company name    |
| `phone`   | `string` | **Required**. Company phone   |
| `email`   | `string` | **Required**. Company email   |
| `address` | `string` | **Required**. Company address |
| `id_city` | `number` | **Required**. Company city id |

```http
  DELETE /v1/companies/${id}
```

| Headers         | Type     | Description                |
| :-------------- | :------- | -------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `id`      | `number` | **Required**. Company id |

#### Get all regions

```http
  GET /v1/regions
```

| Headers         | Type     | Description                |
| :-------------- | :------- | -------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

#### Get a region

```http
  GET /v1/regions/${id}
```

| Headers         | Type     | Description                |
| :-------------- | :------- | -------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

| Parameter | Type     | Description             |
| :-------- | :------- | :---------------------- |
| `id`      | `number` | **Required**. Region id |

#### Create a region

```http
  POST /v1/regions
```

| Headers         | Type     | Description                |
| :-------------- | :------- | -------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `name`    | `string` | **Required**. Region name |

#### Update a region

```http
  PUT /v1/regions
```

| Headers         | Type     | Description                |
| :-------------- | :------- | -------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `name`    | `string` | **Required**. Region name |

#### Delete a region

```http
  DELETE /v1/regions/${id}
```

| Headers         | Type     | Description                |
| :-------------- | :------- | -------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

| Parameter | Type     | Description             |
| :-------- | :------- | :---------------------- |
| `id`      | `number` | **Required**. Region id |

#### Get all countries

```http
  GET /v1/countries
```

| Headers         | Type     | Description                |
| :-------------- | :------- | -------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

#### Get a country

```http
  GET /v1/countries/${id}
```

| Headers         | Type     | Description                |
| :-------------- | :------- | -------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `id`      | `number` | **Required**. Country id |

#### Create a country

```http
  POST /v1/countries
```

| Headers         | Type     | Description                |
| :-------------- | :------- | -------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

| Parameter   | Type     | Description                     |
| :---------- | :------- | :------------------------------ |
| `name`      | `string` | **Required**. Country name      |
| `id_region` | `number` | **Required**. Country region id |

#### Update a country

```http
  PUT /v1/countries
```

| Headers         | Type     | Description                |
| :-------------- | :------- | -------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

| Parameter   | Type     | Description                     |
| :---------- | :------- | :------------------------------ |
| `name`      | `string` | **Required**. Country name      |
| `id_region` | `number` | **Required**. Country region id |

#### Delete a country

```http
  DELETE /v1/countries/${id}
```

| Headers         | Type     | Description                |
| :-------------- | :------- | -------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `id`      | `number` | **Required**. Country id |

#### Get all cities

```http
  GET /v1/cities
```

| Headers         | Type     | Description                |
| :-------------- | :------- | -------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

#### Get a city

```http
  GET /v1/cities/${id}
```

| Headers         | Type     | Description                |
| :-------------- | :------- | -------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

| Parameter | Type     | Description           |
| :-------- | :------- | :-------------------- |
| `id`      | `number` | **Required**. City id |

#### Create a city

```http
  POST /v1/cities
```

| Headers         | Type     | Description                |
| :-------------- | :------- | -------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

| Parameter    | Type     | Description                   |
| :----------- | :------- | :---------------------------- |
| `name`       | `string` | **Required**. City name       |
| `id_country` | `number` | **Required**. City country id |

#### Update a city

```http
  PUT /v1/cities
```

| Headers         | Type     | Description                |
| :-------------- | :------- | -------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

| Parameter    | Type     | Description                   |
| :----------- | :------- | :---------------------------- |
| `name`       | `string` | **Required**. City name       |
| `id_country` | `number` | **Required**. City country id |

#### Delete a city

```http
  DELETE /v1/cities/${id}
```

| Headers         | Type     | Description                |
| :-------------- | :------- | -------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

| Parameter | Type     | Description           |
| :-------- | :------- | :-------------------- |
| `id`      | `number` | **Required**. City id |

## Tecnologías

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [JsonWebTokens](https://jwt.io/)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme)
- [MySQL](https://github.com/mysqljs/mysql#readme)
- [CORS](https://github.com/expressjs/cors#readme)
- [DotEnv](https://github.com/motdotla/dotenv#readme)
