import { db as dbConfig } from "../config.js";
import createSequelize from "../db.js";

import "../api/associations.js";

const sequelize = createSequelize(dbConfig);

async function seed() {
  try {
    await sequelize.sync({ force: true });
    // console.log(sequelize.models);
    console.log("Database seeded 😁");
  } catch (error) {
    console.error(error);
  }
}

seed();
