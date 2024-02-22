'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product,{
        foreignKey: 'mediable_id',
        constraints: false,
        
        as: 'featuredImage'
      })
      this.belongsTo(models.Product,{
        foreignKey: 'mediable_id',
        constraints: false,

        as: 'galleryImages'
      })

    }
  }
  Media.init({
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
    file_size: DataTypes.INTEGER,
    featured: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Media',
    tableName: 'media'
  });
  return Media;
};