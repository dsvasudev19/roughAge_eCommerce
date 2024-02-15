'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    static associate(models) {
      
    }
  }
  Wishlist.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "wishlists",
      modelName: "Wishlist",
    }
  )
  return Wishlist
}