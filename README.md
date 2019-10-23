# Welcome to Mapa 33

The awesome web app. :)

## Requirements

- NodeJs v8.10.0 or higher
- Npm v5.6.0 or higher
- Postgresql v9 or higher


## How to start the project

1. Install project dependencies

`npm install`

2. Install project development dependencies (Optional)

`npm install --only=dev`

3. Create file *.env* in the root of the project and add your environment variables. Example:

```
NODE_ENV=development
DATABASE_NAME=
DATABASE_URL=postgres://[user]:[pass]@localhost:5432/[database_name]
SERVER_URL=http://localhost:3000
PORT=3000
```

4. Config your database variables into `config/database.json` file. Example:

```
{
  "development": {
    "username": "postgres",
    "password": null,
    "database": "mapa33-dev",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": false
  },
  ...
}
```

5. Run database migrations (You must run this command when there are changes into database schema)

`node_modules/.bin/sequelize db:migrate`

6. Run the server project.

`npm run dev-start`

7. Open a new terminal and build the "react app"

`npm run build`

8. Open your browser `http://localhost:3000/` and enjoy!. :)


# API DOCS

## List land

#### `GET /api/land/`

List all available lands.

#### `200 OK` - Response

```
{
  data: [
    {
      name: '',
      level: '',
      status: '',
      geom: '',
      location: '',
      entity: '',
      use_type: '',
      acquisition_type: '',
      year_acquisition: '',
      reason_conservation: ''
    },
    ...
  ]
}
```

## Create land

#### `POST /api/land/`

Create a new land.

#### Request body

| Field                 | Type          | Required      |
| --------------------- | ------------- | ------------- |
| name                  | string        | yes           |
| level                 | string        | yes           |
| status                | string        | yes           |
| geom                  | object        | yes           |
| location              | string        | yes           |
| entity                | string        | yes           |
| use_type              | string        | yes           |
| acquisition_type      | string        | yes           |
| year_acquisition      | integer       | yes           |
| reason_conservation   | string        | yes           |

#### `200 OK` - Response

```
{
  id: '',
  name: '',
  level: '',
  status: '',
  geom: '',
  location: '',
  entity: '',
  use_type: '',
  acquisition_type: '',
  year_acquisition: 2019,
  reason_conservation: ''
}
```

## Get land

#### `GET /api/land/:id`

Get a specific land.

#### `200 OK` - Response

```
{
  id: '',
  name: '',
  level: '',
  status: '',
  geom: '',
  location: '',
  entity: '',
  use_type: '',
  acquisition_type: '',
  year_acquisition: 2019,
  reason_conservation: ''
}
```

## Update land

#### `PUT /api/land/:id`

Update a specific land.

#### Request body

| Field                 | Type          | Required      |
| --------------------- | ------------- | ------------- |
| name                  | string        | yes           |
| level                 | string        | yes           |
| status                | string        | yes           |
| geom                  | object        | yes           |
| location              | string        | yes           |
| entity                | string        | yes           |
| use_type              | string        | yes           |
| acquisition_type      | string        | yes           |
| year_acquisition      | integer       | yes           |
| reason_conservation   | string        | yes           |

#### `200 OK` - Response

`Empty`

## Delete land

#### `DEL /api/land/:id`

Remove a specific land.

#### `200 OK` - Response

`Empty`


