const Seller = require("../database/models/Seller");
const Sequelize = require("sequelize");
const Sale = require("../database/models/Sale");

module.exports = {
    async listAllSales( req, res){
        const sales = await Sale.findAll({
            order: [["sellerId", "ASC"]],
        }).catch((error) => {
            res.status(500).json({msg : "Falha na conexão"});
        });
        if (sales) res.status(200).json({ sales });
        else res.status(404).json({msg : "Não foi possivel encontrar vendas."});
    },
}