import dotenv from "dotenv";
dotenv.config();

const db = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  // productionDatabaseUrl: process.env.PRODUCTION_DATABASE_URL,
  // logging: (...msg) => console.log(msg),
  logging: false,
};

const server = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  jwtSecretRecovery: process.env.JWT_SECRET_RECOVERY,
  backendUrl: process.env.BACKEND_URL,
};

const client = {
  clientDomain: process.env.CLIENT_DOMAIN,
};

export { db, server, client };
