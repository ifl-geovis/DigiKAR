import { Database } from "duckdb-async";

export const setupDb = async () => {
  process.env["OGR_XLSX_HEADERS"] = "FORCE";
  const db = await Database.create("./app/data/digikar.duckdb");
  db.run("INSTALL spatial;");
  db.run("LOAD spatial;");
  db.run(`
    CREATE TABLE IF NOT EXISTS state_calendar
    AS SELECT * 
    FROM st_read(
      './app/data/Factoid_Staatskalender-Erfurt_consolidation_coordinates_event-values_person-IDs.xlsx',
      layer='FactCons1'
    );
  `);
  db.run(`
  CREATE TABLE IF NOT EXISTS university_mainz
  AS SELECT * 
  FROM st_read(
    './app/data/Factoid_PROFS_v10_geocoded-with-IDs_v2.xlsx',
    layer='FactCons'
  );
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
