module.exports={
  "development": {
    "username": "root",
    "password": "root",
    "database": "roughage-ecommerce",
    "host": "127.0.0.1",
    "dialect": "mysql",
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  // "production": {
  //   "username": "root",
  //   "password": null,
  //   "database": "database_production",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql"
  // },
  "production": {
    "use_env_variable": process.env.DATABASE_URL, // Use the DATABASE_URL environment variable for production
    "dialect": 'postgresql', 
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false, // To avoid issues with self-signed certificates
      },
    },
    "ssl": true,
  },
}
