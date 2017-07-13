/**
 * Created by imad on 17/05/2017.
 */
import Sequelize from "sequelize";


module.exports = function(sequelize, DataTypes) {
  const Product = sequelize.define('Product', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    desc: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }
);
  return Product;
};
