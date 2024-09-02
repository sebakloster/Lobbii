import { DataTypes } from "sequelize";
import { db as dbConfig } from "../../../config.js";
import createSequelize from "../../../db.js";
import bcrypt from "bcrypt";

const sequelize = createSequelize(dbConfig);

const User = sequelize.define("User", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  yt_username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tiktok_username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tw_username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profile_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  profile_picture_url: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue:
      "https://firebasestorage.googleapis.com/v0/b/lobbii-firebase.appspot.com/o/profile_pictures%2Fprofile-default.png?alt=media&token=d6461a2d-5e91-4670-83bd-0cc1ed7a93cd",
  },
  banner_picture_url: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

export default User;
