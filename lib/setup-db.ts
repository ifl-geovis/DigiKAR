import { Database } from "duckdb-async";

export const setupDb = async () => {
  process.env["OGR_XLSX_HEADERS"] = "FORCE";
  const db = await Database.create("./data/digikar.duckdb");
  db.run("INSTALL spatial;");
  db.run("LOAD spatial;");

  db.run("DROP TABLE IF EXISTS state_calendar_erfurt");
  db.run(`
    CREATE TABLE state_calendar_erfurt
    AS SELECT *
    FROM st_read(
      './data/Factoid_Staatskalender-Erfurt_consolidation_coordinates_event-values_person-IDs.xlsx',
      layer='FactCons1'
    );
  `);
  db.run(`
    ALTER TABLE state_calendar_erfurt
    RENAME COLUMN pers_ID_FS TO pers_ID;
  `);
  db.run(`
    UPDATE state_calendar_erfurt
    SET "geonames address" = NULL
    WHERE "geonames address" = 'nan';
  `);

  db.run("DROP TABLE IF EXISTS university_mainz");
  db.run(`
    CREATE TABLE university_mainz
    AS SELECT *
    FROM st_read(
      './data/Factoid_PROFS_v10_geocoded-with-IDs_v2.xlsx',
      layer='FactCons'
    );
  `);
  db.run(`
    UPDATE university_mainz
    SET "geonames address" = NULL
    WHERE "geonames address" = 'n/a';
`);

  db.run("DROP TABLE IF EXISTS jahns");
  db.run(`
    CREATE TABLE jahns
    AS SELECT *
    FROM st_read(
      './data/Factoid_Jahns_consolidation_geocoded_personIDs_2614rows.xlsx',
      layer='FactCons1'
    );
  `);

  db.run("DROP TABLE IF EXISTS state_calendar_aschaffenburg");
  db.run(`
    CREATE TABLE state_calendar_aschaffenburg
    AS SELECT *
    FROM st_read(
      './data/Factoid_Staatskalender-Aschaffenburg_TEST.xlsx',
      layer='FactCons1'
    );
  `);
  db.run(`
    UPDATE state_calendar_aschaffenburg
    SET "geonames address" = NULL
    WHERE "geonames address" = 'n/a';
`);
};
