'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order_Details = sequelize.define('Order_Details', {
    shipping_address: DataTypes.STRING
  }, {});
  Order_Details.associate = function(models) {
    // associations can be defined here
  };
  return Order_Details;
};