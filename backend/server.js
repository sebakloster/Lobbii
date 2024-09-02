import express from "express";
import { db as dbConfig, server as svConfig } from "./config.js";
import setupDatabase from "./db.js";
import router from "./network/routes.js";
import errors from "./network/errors.js";
import cors from "cors";
import helmet from "helmet";

const sequelize = setupDatabase(dbConfig);

const app = express();

app.use(helmet());
app.use(cors());

import "./api/associations.js";
import "./utils/auth/index.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
router(app);

// Error middleware (last)
app.use(errors);

const server = app.listen(svConfig.port, async () => {
  console.log("App listening on port " + svConfig.port + "!");
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connection has been established successfully. 🚀");
    })
    .catch((err) => {
      console.error("Error connecting to the database:", err);
    });
});

export { app, server };
