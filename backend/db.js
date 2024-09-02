import { Sequelize } from "sequelize";
let sequelize = null;

const setupDatabase = (config) => {
  if (!sequelize) {
    if (config.productionDatabaseUrl) {
      sequelize = new Sequelize(config.productionDatabaseUrl, {
        dialect: "postgres",
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        logging: false,
      });
    } else {
      sequelize = new Sequelize(config);
    }
  }
  return sequelize;
};

export default setupDatabase;
