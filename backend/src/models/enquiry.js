const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Enquiry extends Model {
        static associate(models) {
            
        }
    }
    Enquiry.init(
        {
            name: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
            },
            phone: {
                type: DataTypes.STRING,
            },
            message: {
                type: DataTypes.STRING,
            },
            status: {
                type: DataTypes.ENUM,
                values: ["pending", "resolved", "rejected"],
                defaultValue: "pending",
            },
        },
        {
            sequelize,
            tableName: "enquiries",
            modelName: "Enquiry",
        }
    );


    return Enquiry;
}