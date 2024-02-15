"use strict"

const {Model} = require("sequelize")


module.exports=(sequelize,DataTypes)=>{
    class Product extends Model{
        static associate(models){
            // Product.hasMany(models.Media,{
            //     foreignKey:"mediable_id",
            //     constraints:false,
            //     scope:{
            //         mediable_type:"product"
            //     }
            // })
            this.hasOne(models.Media, {
                foreignKey: "mediable_id",
                constraints: false,
                scope: {
                    mediable_type: "Product",
                    featured: true
                },
                as: "featuredImage"
            })
            this.hasMany(models.Media, {
                foreignKey: "mediable_id",
                constraints: false,
                scope: {
                    mediable_type: "Product"
                },
                as: "galleryImages"
            })
            this.belongsTo(models.Store, {
                foreignKey: "storeId",
                constraints: false,
                as: "store"
            })
        }
    }
    Product.init({
        productId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        storeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        productSlug: {
            type: DataTypes.STRING,
            allowNull: false
        },
        productDescription: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        productPrice: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        productStock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productStatus: {
            type: DataTypes.ENUM("Available","Coming soon","Out of stock"),
            defaultValue: 'Available',
            allowNull: false
        },
        productCategory: {
            type: DataTypes.TEXT,
            defaultValue:'Vegetable',
            allowNull: false,
        },
        productBrand: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: "Product",
        tableName: "products",

    })
    return Product;

}