'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BC_Tracking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.BC_Puzzle);
    }
  }
  BC_Tracking.init(
    {
      totalAttempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      totalSuccesses: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      goal0EarnedCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      goal1EarnedCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      goal2EarnedCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      goal3EarnedCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      goal4EarnedCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      goal5EarnedCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      goal6EarnedCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      goal7EarnedCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'BC_Tracking',
    }
  );
  return BC_Tracking;
};
