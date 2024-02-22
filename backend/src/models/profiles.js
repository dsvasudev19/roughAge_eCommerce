'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Profiles.init({
    mediable_id: DataTypes.INTEGER,
    mediable_type: DataTypes.STRING,
    url: DataTypes.TEXT,
    name: DataTypes.TEXT,
    file_name: DataTypes.TEXT,
    file_type: DataTypes.STRING,
    path: DataTypes.STRING,
    file_size: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profiles',
    tableName: 'profiles'
  });
  return Profiles;
};