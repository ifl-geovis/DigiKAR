import { VARCHAR } from "@duckdb/node-api";
import { getDatabase } from "./setupDatabase";

export const getUniquePlaces = async (
  /** Which data source to be used */
  source?: string,
) => {
  const db = await getDatabase();
  const connection = await db.connect();

  const prepared = await connection.prepare(`
    SELECT DISTINCT
        place_name AS place
    FROM events
    ${
      source &&
      `WHERE
        list_contains(sources, $source)`
    }
    ORDER BY place_name;
  `);
  if (source) prepared.bind({ source }, { source: VARCHAR });
  const reader = await prepared.runAndReadAll();
  connection.close();

  return reader.getRowObjectsJson();
};
