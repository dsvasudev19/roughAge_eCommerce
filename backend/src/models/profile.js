'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Store,{
        foreignKey: 'mediable_id',
        constraints: false,
        scope: {
          mediable_type: 'Store'
        },
        as: 'store'
      });
    }
  }
  Profile.init({
    mediable_id: DataTypes.INTEGER,
    mediable_type: DataTypes.STRING,
    url: DataTypes.TEXT,
    name: DataTypes.TEXT,
    file_name: DataTypes.TEXT,
    file_type: DataTypes.STRING,
    path: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        const val = this.getDataValue("url");
        const val2 = this.getDataValue("file_name");
        return val && val2
          ? process.env.BASE_URL + "/" + val.split("/")[2] + "/" + val2
          : null;
      },
    },
    file_size: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
    tableName: 'profiles'
  });
  return Profile;
};