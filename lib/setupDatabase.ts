import { Database } from "duckdb-async";

export const setupDatabase = async () => {
  process.env["OGR_XLSX_HEADERS"] = "FORCE";
  const db = await Database.create("./data/digikar.duckdb");
  await db.run(`SET extension_directory="./data";`);
  await db.run("INSTALL spatial;");
  await db.run("LOAD spatial;");

  await db.run(`
    CREATE OR REPLACE TABLE state_calendar_erfurt
    AS SELECT *
    FROM st_read(
      './data/Factoid_Staatskalender-Erfurt_consolidation_coordinates_event-values_person-IDs.xlsx',
      layer='FactCons1'
    );
  `);
  await db.run(`
    ALTER TABLE state_calendar_erfurt
    RENAME COLUMN pers_ID_FS TO pers_ID;
  `);

  await db.run(`
    CREATE OR REPLACE TABLE university_mainz
    AS SELECT *
    FROM st_read(
      './data/Factoid_PROFS_v10_geocoded-with-IDs_v2.xlsx',
      layer='FactCons'
    );
  `);

  await db.run(`
    CREATE OR REPLACE TABLE jahns
    AS SELECT *
    FROM st_read(
      './data/Factoid_Jahns_consolidation_geocoded_personIDs_2614rows.xlsx',
      layer='FactCons1'
    );
  `);

  await db.run(`
    CREATE OR REPLACE TABLE state_calendar_aschaffenburg
    AS SELECT *
    FROM st_read(
      './data/Factoid_Staatskalender-Aschaffenburg_TEST.xlsx',
      layer='FactCons1'
    );
  `);

  await db.run(`
    CREATE OR REPLACE TABLE cathedral_provost_mainz
    AS FROM './data/DigiKAR_geocoding_Clerics_1August2022.csv';
  `);
  await db.run(`ALTER TABLE cathedral_provost_mainz DROP e_count;`);
  await db.run(`ALTER TABLE cathedral_provost_mainz DROP s_count;`);
  await db.run(
    `ALTER TABLE cathedral_provost_mainz RENAME '# Full Address' TO full_address;`
  );
  await db.run(
    `ALTER TABLE cathedral_provost_mainz RENAME Longitude to longitude;`
  );
  await db.run(
    `ALTER TABLE cathedral_provost_mainz RENAME Latitude to latitude;`
  );

  // Replace all sorts of false NULL values
  const tables = await db.all(`
    SELECT DISTINCT table_name
    FROM duckdb_columns()
    WHERE internal = false;
  `);
  const columns = await db.all(`
    SELECT column_name, table_name
    FROM duckdb_columns()
    WHERE table_name
      IN (
        ${tables.map(({ table_name }) => `'${table_name}'`).join(", ")}
      );
  `);

  columns.forEach(
    async ({ column_name, table_name }) =>
      await db.run(
        `UPDATE ${table_name}
        SET "${column_name}" = NULL
        WHERE "${column_name}"
          SIMILAR TO '^(#|nan|nan, .*|n/a)$';`
      )
  );

  await db.run(`
    CREATE OR REPLACE VIEW unique_places AS
      SELECT FIRST("geonames address") AS place_name,
        FIRST(ST_Point(longitudes::DOUBLE, latitudes::DOUBLE)) AS geom,
        LIST(DISTINCT source) as sources,
        Count(*)
      FROM (
        SELECT "geonames address",
          longitudes,
          latitudes,
          'state_calendar_aschaffenburg' AS source
        FROM state_calendar_aschaffenburg
        UNION
        SELECT "geonames address",
          longitudes,
          latitudes,
          'state_calendar_erfurt' AS source
        FROM state_calendar_erfurt
        UNION
        SELECT "geonames address",
          longitudes,
          latitudes,
          'university_main' AS source
        FROM university_mainz
        UNION
        SELECT "geonames address",
          geonames_lng,
          geonames_lat,
          'jahns' AS source
        FROM jahns
      )
      GROUP BY
        "geonames address",
  `);

  await db.close();
};
