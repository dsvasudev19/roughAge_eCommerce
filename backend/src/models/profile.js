'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Profile extends Model {
        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: "mediable_id",
                constraints: false,
                scope: {
                    mediable_type: "User"
                },
                as: "profile"
            }
            )
            // this.belongsTo(models.Vendor,{
            //     foreignKey: "mediable_id",
            //     constraints: false,
            //     scope: {
            //         mediable_type: "Vendor"
            //     },
            //     as: "vendor"
            // })
            this.belongsTo(models.Store,{
                foreignKey: "mediable_id",
                constraints: false,
                scope: {
                    mediable_type: "Store"
                },
                as: "storeImages"
            })
        }
    }
    Profile.init({
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
        file_size: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'profiles',
        modelName: 'Profile',
        paranoid: true,
    });
    return Profile
}