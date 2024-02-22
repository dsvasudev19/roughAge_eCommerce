'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Media,{
        foreignKey: 'mediable_id',
        constraints: false,
        scope:{
          mediable_type: 'Product',
          featured:true
        },
        as: 'featuredImage'
      })
      this.hasMany(models.Media,{
        foreignKey: 'mediable_id',
        constraints: false,
        scope:{
          mediable_type: 'Product',
          featured:false
        },
        as: 'galleryImages'
      })
      this.hasMany(models.Review,{
        foreignKey: 'reviewable_id',
        constraints: false,
        scope:{
          reviewable_type: 'Product'
        },
        
      })
    }
  }
  Product.init({
    storeId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DOUBLE,
    stock: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    category: DataTypes.STRING,
    brand: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products'
  });
  return Product;
};