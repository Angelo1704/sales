const Sequelize = require("sequelize");


class Seller extends Sequelize.Model {
    static init(sequelize){
        super.init({
            nome: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.STRING,
        },
        {
            sequelize
        }
        );
    }
    static associate(model){
        this.hasMany(model.Sale, { foreignKey : sellerId });
    }
}

module.exports = Seller;