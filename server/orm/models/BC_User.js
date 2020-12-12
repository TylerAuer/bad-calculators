'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BC_User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  BC_User.init(
    {
      first: DataTypes.STRING,
      last: DataTypes.STRING,
      pic: DataTypes.STRING,
      authId: {
        type: DataTypes.STRING,
        unique: true,
      },
      email: DataTypes.STRING,
      progress: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
    },
    {
      sequelize,
      modelName: 'BC_User',
    }
  );
  return BC_User;
};
