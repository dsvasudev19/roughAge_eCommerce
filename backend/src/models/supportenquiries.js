'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SupportEnquiries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SupportEnquiries.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    message: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SupportEnquiries',
    tableName: 'support_enquiries'
  });
  return SupportEnquiries;
};