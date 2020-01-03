module.exports = function(sequelize, Sequelize) {
  const Work = sequelize.define("works", {
    id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(200),
	  allowNull: false,
	  unique: true
    }
  });

  return Work;
};
