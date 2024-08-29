import { getDatabase } from "./createDatabase";

export const getUniquePlaces = async (
  /** Which data source to be used */
  source?: string,
) => {
  //TODO: to avoid white listing table names, create view with all places and source as column
  const db = await getDatabase();
  const connection = await db.connect();

  const statement = await connection.prepare(`
    SELECT DISTINCT
        place_name AS place
    FROM events
    ${
      source &&
      `WHERE
        list_contains(sources, ?)`
    }
    ORDER BY place_name;
  `);

  const res = await statement.all(source);
  connection.close();

  return res;
};
