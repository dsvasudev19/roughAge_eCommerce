'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{
        foreignKey:'userId',
        constraints:false
      })
      this.hasMany(models.OrderItem,{
        foreignKey:'id',
        constraints:false
      })
      this.hasOne(models.Address,{
        foreignKey:'id',
        constraints:false
      })
    }
  }
  order.init({
    name: DataTypes.STRING,
    userId:DataTypes.INTEGER, 
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    date:DataTypes.DATE,
    status:DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Order',
    tableName:'orders'
  });
  return order;
};