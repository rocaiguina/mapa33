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
