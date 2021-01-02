'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BC_Monitor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  BC_Monitor.init(
    {
      totalAttemptsAtTimeOfLog: DataTypes.INTEGER,
      totalSuccessesAtTimeOfLog: DataTypes.INTEGER,
      userCountAtTimeOfLog: DataTypes.INTEGER,
      puzzleDataAtTimeOfLog: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: 'BC_Monitor',
    }
  );
  return BC_Monitor;
};
