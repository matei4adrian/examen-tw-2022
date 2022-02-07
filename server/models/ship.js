module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Ship", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [3, 30] },
    },
    displacement: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 50 },
    },
  });
};
