"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Product, {
        foreignKey: "mediable_id",
        constraints: false,
        as: "galleryImages",
      });
      this.belongsTo(models.Product, {
        foreignKey: "mediable_id",
        constraints: false,
        as: "featuredImage",
      });
    }
  }

  Media.init(
    {
      mediable_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mediable_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      file_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      file_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      file_size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: true,
        get() {
          const val = this.getDataValue("url");
          const val2 = this.getDataValue("file_name");
          return val && val2
            ? process.env.BASE_URL+"/" +val.split('/')[2] + "/"+val2
            : null;
        },
      }, 
      featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "media",
      modelName: "Media",
    }
  );
  return Media;
};
