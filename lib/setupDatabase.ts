import { Database } from "duckdb-async";

export const setupDatabase = async () => {
  process.env["OGR_XLSX_HEADERS"] = "FORCE";
  const db = await Database.create("./data/digikar.duckdb");
  await db.run(`SET extension_directory="./data";`);
  await db.run("INSTALL spatial;");
  await db.run("LOAD spatial;");

  await db.run("DROP TABLE IF EXISTS state_calendar_erfurt");
  await db.run(`
    CREATE TABLE state_calendar_erfurt
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
    UPDATE state_calendar_erfurt
    SET "geonames address" = NULL
    WHERE "geonames address" = 'nan';
  `);

  await db.run("DROP TABLE IF EXISTS university_mainz");
  await db.run(`
    CREATE TABLE university_mainz
    AS SELECT *
    FROM st_read(
      './data/Factoid_PROFS_v10_geocoded-with-IDs_v2.xlsx',
      layer='FactCons'
    );
  `);
  await db.run(`
    UPDATE university_mainz
    SET "geonames address" = NULL
    WHERE "geonames address" = 'n/a';
  `);

  await db.run("DROP TABLE IF EXISTS jahns");
  await db.run(`
    CREATE TABLE jahns
    AS SELECT *
    FROM st_read(
      './data/Factoid_Jahns_consolidation_geocoded_personIDs_2614rows.xlsx',
      layer='FactCons1'
    );
  `);

  await db.run("DROP TABLE IF EXISTS state_calendar_aschaffenburg");
  await db.run(`
    CREATE TABLE state_calendar_aschaffenburg
    AS SELECT *
    FROM st_read(
      './data/Factoid_Staatskalender-Aschaffenburg_TEST.xlsx',
      layer='FactCons1'
    );
  `);
  await db.run(`
    UPDATE state_calendar_aschaffenburg
    SET "geonames address" = NULL
    WHERE "geonames address" = 'n/a';
  `);
  await db.close();
};
