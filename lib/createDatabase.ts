import { Database, OPEN_READONLY } from "duckdb-async";

export const createDatabase = async () => {
  const db = await Database.create("./data/digikar.duckdb", OPEN_READONLY);
  await db.run(`SET extension_directory="./data/.duckdb/extensions";`);
  await db.run("LOAD spatial;");
  return await db.connect();
};

export const getDatabase = async () => {
  if (dbInstance) return dbInstance;
  dbInstance = await createDatabase();
  return dbInstance;
};

let dbInstance: Awaited<ReturnType<typeof createDatabase>>;
