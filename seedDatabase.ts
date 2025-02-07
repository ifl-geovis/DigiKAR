import { DuckDBInstance } from "@duckdb/node-api";
import { readFileSync, unlinkSync } from "fs";
import { existsSync } from "fs";

console.log("Setting up database ...");

(async () => {
  const sqlPath = "./lib/setup.sql";
  const dbPath = "data/digikar.duckdb";

  if (existsSync(dbPath)) {
    unlinkSync(dbPath);
  }

  const setupScript = readFileSync(sqlPath, "utf-8");
  const instance = await DuckDBInstance.create(dbPath);
  const connection = await instance.connect();
  await connection.run(setupScript);
  connection.close();
  console.log("Database setup completed.");
})();
