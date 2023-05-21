import { Pool } from "pg";
import { configDB } from "./settings";

const { user, host, database, password, port } = configDB;

export const pool = new Pool({
  user,
  host,
  database,
  password,
  port,
});
