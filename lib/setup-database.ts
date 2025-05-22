import { DuckDBInstance } from "@duckdb/node-api";

export const createDatabase = async () => {
  const instance = await DuckDBInstance.create("./data/digikar.duckdb");
  const connection = await instance.connect();
  await connection.run(
    "SET extension_directory = './data/.duckdb/extensions';",
  );
  // await connection.run("INSTALL SPATIAL;");
  await connection.run("LOAD SPATIAL;");
  return instance;
};

export const getDatabase = async () => {
  if (dbInstance) return dbInstance;
  dbInstance = await createDatabase();
  return dbInstance;
};

let dbInstance: Awaited<ReturnType<typeof createDatabase>>;
