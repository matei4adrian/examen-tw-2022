module.exports = (sequelize, DataTypes) => {
  return sequelize.define("CrawMember", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [5, 30] },
    },
    role: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["CAPTAIN", "BOATSWAIN"],
    },
  });
};
