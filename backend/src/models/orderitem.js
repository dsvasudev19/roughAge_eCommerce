'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderitem extends Model {
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
      this.belongsTo(models.Product,{
        foreignKey:'productId',
        constraints:false
      })
    }
  }
  orderitem.init({
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderItem',
    tableName:'orderitems'
  });
  return orderitem;
};