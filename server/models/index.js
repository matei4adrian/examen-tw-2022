const Sequelize = require("sequelize");
const db = require("../config/db");
const ShipModel = require("./ship");
const CrawMemberModel = require("./crawMember");

const Ship = ShipModel(db, Sequelize);
const CrawMember = CrawMemberModel(db, Sequelize);

Ship.hasMany(CrawMember, { onDelete: "cascade" });
CrawMember.belongsTo(Ship);

module.exports = {
  Ship,
  CrawMember,
  connection: db,
};
