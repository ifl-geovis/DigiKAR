import { Database } from "duckdb-async";

export const createDatabase = async () => {
  const db = await Database.create("./data/digikar.duckdb");
  await db.run(`SET extension_directory="./data";`);
  await db.run("LOAD spatial;");
  return db;
};
