'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RefreshToken.init({
    userId: DataTypes.INTEGER,
    token: DataTypes.TEXT,
    expirty_date: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'RefreshToken',
    tableName: 'refresh_tokens'
  });
  RefreshToken.createToken = async function (user) {
    let _token = uuidv4();
    let expiryDate = Date.now() + 1000 * 60 * 10;
    let refreshToken = await this.create({
      token: _token,
      userId: user.id,
      expiry_date: expiryDate,
    });
    return refreshToken.token;
  };

  RefreshToken.verifyExpiration = (token) => {
    return token.expiryDate < Date.now();
  };
  return RefreshToken;
};