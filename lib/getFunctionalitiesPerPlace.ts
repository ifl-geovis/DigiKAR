import { Feature, Point } from "geojson";
import { createDatabase } from "./setupDatabase";
import { VARCHAR } from "@duckdb/node-api";

export const getFunctionalitiesPerPlace = async (
  lens = "Universität Mainz Studierende",
  functions?: string[],
) => {
  const db = await createDatabase();
  const connection = await db.connect();

  const prepared = await connection.prepare(`
    WITH functions_sum AS (
      SELECT 
        FIRST(place_name) AS place_name,
        place,
        person_function AS function,
        institution_name AS institution,
        COUNT(*) AS count
      FROM events e
      WHERE
        event_analytical_lens LIKE $lens
        AND place IS NOT NULL
        AND place_name IS NOT NULL
        AND person_function SIMILAR TO $functionality
      GROUP BY
        place,
        institution_name,
        person_function
      HAVING
        place IS NOT NULL
        AND institution_name IS NOT NULL
    )
    SELECT
      FIRST(place_name) as place,
      institution,
      ST_AsGeoJSON(place) AS geometry,
      JSON_GROUP_OBJECT(function, count) AS functionalities
    FROM functions_sum
    GROUP BY
      place,
      institution;
  `);

  const functionsParsed = functions
    ? `.*(${functions?.map((d) => decodeURI(d).normalize()).join("|")}).*`
    : ".*";
  const lensParsed = lens ? decodeURI(lens).normalize() : "%";
  prepared.bind(
    {
      lens: lensParsed,
      functionality: functionsParsed,
    },
    {
      lens: VARCHAR,
      functionality: VARCHAR,
    },
  );
  const reader = await prepared.runAndReadAll();
  const res = reader.getRowObjectsJson();
  connection.closeSync();

  return res.map(({ place, functionalities, institution, geometry }, id) => {
    const geometryStr = geometry?.toString();
    return {
      id,
      type: "Feature",
      properties: {
        place,
        institution,
        functionalities,
      },
      geometry: geometryStr ? JSON.parse(geometryStr) : null,
    } as Feature<
      Point,
      {
        place: string;
        institution: string;
        functionalities: { function: number };
      }
    >;
  });
};
