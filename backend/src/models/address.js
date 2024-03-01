'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Order,{
        foreignKey:'orderId',
        constraints:false
      })
    }
  }
  address.init({
    orderId: DataTypes.INTEGER,
    address: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Address',
    tableName:'addresses'
  });
  return address;
};