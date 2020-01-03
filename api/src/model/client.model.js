module.exports = function(sequelize, Sequelize) {
  const Client = sequelize.define("clients", {
    id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(200),
	  allowNull: false,
	  unique: true
    },
    email: {
      type: Sequelize.STRING(200),
      allowNull: false,
      unique: true
    }
  });

  return Client;
};
