'use strict';
module.exports = (sequelize, DataTypes) => {
  const MyUser = sequelize.define('MyUser', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {});
  MyUser.associate = function(models) {
    // associations can be defined here
  };
  return MyUser;
};