import { DataTypes } from "sequelize";
import { db as dbConfig } from "../../../config.js";
import createSequelize from "../../../db.js";

const sequelize = createSequelize(dbConfig);

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  external_link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Product;
