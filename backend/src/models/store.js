'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Profile,{
        foreignKey: 'mediable_id',
        constraints: false,
        scope: {
          mediable_type: 'Store'
        },
        as: 'profile'
      });
      this.hasMany(models.Product,{
        foreignKey: 'storeId'
      });
     
    }
  }
  Store.init({
    name: DataTypes.STRING,
    about: DataTypes.TEXT,
    headId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    lattitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Store',
    tableName: 'stores'
  });
  return Store;
};