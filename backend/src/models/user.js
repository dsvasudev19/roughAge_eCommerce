"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Profile, {
        foreignKey: "mediable_id",
        constraints: false,
        scope: {
          mediable_type: "User",
        },
        as: "profile",
      });
    }
  }

  User.init(
    {
      first_name: DataTypes.STRING,
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender:{
        type:DataTypes.ENUM('Male','Female'),
        allowNull:true
      },
      location:{
        type:DataTypes.STRING,
        allowNull:true,
      },
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      // wishlistId:{
      //   type:DataTypes.ARRAY(DataTypes.INTEGER),
      //   allowNull:true
      // }
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
      paranoid:true
    }
  );
  return User;
};
