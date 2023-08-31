import { Database } from "duckdb-async";

export const setupDb = async () => {
  process.env["OGR_XLSX_HEADERS"] = "FORCE";
  const db = await Database.create("./app/data/digikar.duckdb");
  db.run("INSTALL spatial;");
  db.run("LOAD spatial;");

  db.run("DROP TABLE IF EXISTS state_calendar");
  db.run(`
    CREATE TABLE state_calendar
    AS SELECT *
    FROM st_read(
      './app/data/Factoid_Staatskalender-Erfurt_consolidation_coordinates_event-values_person-IDs.xlsx',
      layer='FactCons1'
    );
  `);
  db.run(`
    ALTER TABLE state_calendar
    RENAME COLUMN pers_ID_FS TO pers_ID;
  `);
  db.run(`
    UPDATE state_calendar
    SET "geonames address" = NULL
    WHERE "geonames address" = 'nan';
  `);

  db.run("DROP TABLE IF EXISTS university_mainz");
  db.run(`
    CREATE TABLE university_mainz
    AS SELECT *
    FROM st_read(
      './app/data/Factoid_PROFS_v10_geocoded-with-IDs_v2.xlsx',
      layer='FactCons'
    );
  `);
  db.run(`
  UPDATE university_mainz
  SET "geonames address" = NULL
  WHERE "geonames address" = 'n/a';
`);

  db.run(`
    CREATE TABLE IF NOT EXISTS jahns
    AS SELECT *
    FROM st_read(
      './app/data/Factoid_Jahns_consolidation_geocoded_personIDs.xlsx',
      layer='FactCons1'
    );
  `);
};
