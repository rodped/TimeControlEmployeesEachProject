module.exports = (sequelize, Sequelize) => {
	const Time = sequelize.define('times', {
	  start: {
		  type: Sequelize.DATE
      },
      end: {
        type: Sequelize.DATE
    }
	});
	
	return Time;
}