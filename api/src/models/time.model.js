module.exports = function(sequelize, Sequelize) {
  const Time = sequelize.define("times", {
    id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    start: {
      type: Sequelize.DATE
    },
    end: {
      type: Sequelize.DATE
    }
  });

  return Time;
};
