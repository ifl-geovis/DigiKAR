import { Database, OPEN_READONLY } from "duckdb-async";

export const createDatabase = async () => {
  const db = await Database.create("./data/digikar.duckdb", OPEN_READONLY);
  await db.run(`SET extension_directory="./data";`);
  await db.run("LOAD spatial;");
  return db;
};
