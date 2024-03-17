module.exports={
  "development": {
    "username": "root",
    "password": "root",
    "database": "roughage-ecommerce",
    "host": "127.0.0.1",
    // "host": "localhost",
    "dialect": "mysql",
    // "dialect": "postgres",
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": process.env.DATABASE_URL, 
    "dialect": 'postgresql', 
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false, 
      },
    },
    "ssl": true,
  },
}
