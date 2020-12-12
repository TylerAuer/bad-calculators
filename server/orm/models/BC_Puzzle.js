'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BC_Puzzle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.BC_Tracking);
    }
  }
  BC_Puzzle.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      level: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      indexInLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      disabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      creator: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Tyler',
      },
      start: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      target: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      maxMoves: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      operations: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      stars: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      blocks: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'BC_Puzzle',
    }
  );
  return BC_Puzzle;
};
