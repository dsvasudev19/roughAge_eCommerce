"use strict"
const {Model}=require("sequelize")

module.exports=(sequelize,DataTypes)=>{
    class Store extends Model{
        static associate(models){
            Store.hasMany(models.Product,{
                foreignKey:"storeId",
                constraints:false,
                as:'storeImages'
            })
            this.hasMany(models.Profile,{
                foreignKey:"mediable_id",
                constraints:false,
                scope:{
                    mediable_type:"Store"
                },
                as:"profile"
            })
        }
    }
    Store.init({
        storeId:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        storeName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        storeSlug:{
            type:DataTypes.STRING,
            allowNull:false
        },
        storeDescription:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        storeHost:{
            type:DataTypes.STRING,
            allowNull:false
        },
        storeStatus:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        },
        createdAt:{
            type:DataTypes.DATE,
            defaultValue:DataTypes.NOW
        },
        updatedAt:{
            type:DataTypes.DATE,
            defaultValue:DataTypes.NOW
        }
    },{
        sequelize,
        modelName:"Store",
        tableName:"stores",
        
    })
    return Store;
}