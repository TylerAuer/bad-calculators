'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BC_Puzzle_Progress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.BC_Puzzle);
    }
  }
  BC_Puzzle_Progress.init(
    {
      total_attempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      total_successes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      goal_1_reached_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      goal_2_reached_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      goal_3_reached_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      goal_4_reached_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      goal_5_reached_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      goal_6_reached_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      goal_7_reached_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      goal_8_reached_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'BC_Puzzle_Progress',
    }
  );
  return BC_Puzzle_Progress;
};
