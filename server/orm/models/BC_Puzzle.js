'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BC_Puzzle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  BC_Puzzle.init(
    {
      failCount: DataTypes.INTEGER,
      successCount: DataTypes.INTEGER,
      stars: DataTypes.JSON,
      start: DataTypes.FLOAT,
      goal: DataTypes.FLOAT,
      operations: DataTypes.JSON,
      desc: DataTypes.STRING,
      creator: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'BC_Puzzle',
    }
  );
  return BC_Puzzle;
};
