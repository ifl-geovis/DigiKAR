import { createDatabase } from "./createDatabase";

export const getUniquePlaces = async (
  /** Which data source to be used */
  source?: string
) => {
  //TODO: to avoid white listing table names, create view with all places and source as column
  const db = await createDatabase();

  const statement = await db.prepare(`
    SELECT 
        place_name 
    FROM unique_places
    ${
      source &&
      `WHERE 
        list_contains(sources, ?)`
    }
    ORDER BY place_name
    ;
  `);

  const res = await statement.all(source);
  await db.close();

  return res;
};
