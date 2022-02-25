const Sequelize = require("sequelize");
const dbConfig = require("./config/dbconfig");
const Seller = require("./models/Seller");
const Sale = require("./models/Sale");

Seller.init(connection);
Sale.init(connection);

Seller.associate(connection.models);
Sale.associate(connection.models);

module.exports = connection;