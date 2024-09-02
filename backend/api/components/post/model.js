import { DataTypes } from "sequelize";
import { db as dbConfig } from "../../../config.js";
import createSequelize from "../../../db.js";

const sequelize = createSequelize(dbConfig);

const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  social_media_platform: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  external_link: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

export default Post;
