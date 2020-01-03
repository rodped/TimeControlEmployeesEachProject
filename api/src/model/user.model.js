module.exports = function(sequelize, Sequelize) {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    username: {
      type: Sequelize.STRING(200),
	  allowNull: false,
	  unique: true
    },
    email: {
      type: Sequelize.STRING(200),
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING(200),
      allowNull: false
    }
  });

  return User;
};
