const Sequelize = require("sequelize");


class Sale extends Sequelize.Model {
    static init(sequelize){
        super.init({
            saleDate: Sequelize.DATE,
            description: Sequelize.STRING,
            value: Sequelize.FLOAT,
        },
        {
            sequelize
        }
        );
    }
    static associate(model){
        this.belongsTo(model.Seller, { foreignKey : "sellerId" });
    }
}

module.exports = Sale;