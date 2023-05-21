import configDBSchema from "../validations/configdb.validation";
import configSettingsSchema from "../validations/configsettings.validation";

const settings = {
  PORT: parseInt(process.env.PORT?.toString() ?? "8096", 10),
  API_KEY_YOUTUBE: process.env.API_KEY_YOUTUBE ?? "",
};

configSettingsSchema.validateSync(settings);

const DB_USER = process.env.DB_USER ?? "";
const DB_HOST = process.env.DB_HOST ?? "";
const DB_DATABASE = process.env.DB_DATABASE ?? "";
const DB_PASSWORD = process.env.DB_PASSWORD ?? "";
const DB_PORT = Number.parseInt(process.env.DB_PORT ?? "5432", 10) ?? 5432;

export const configDB = {
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
};

configDBSchema.validateSync(configDB);

export const dbUrl = `postgresql://${configDB.user}:${configDB.password}@${configDB.host}:${configDB.port}/${configDB.database}`;

export default settings;
