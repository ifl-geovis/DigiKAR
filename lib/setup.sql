.open './data/digikar.duckdb';
---
SET extension_directory = './data';
INSTALL spatial;
LOAD spatial;
---
CREATE MACRO is_na(str) AS str SIMILAR TO '^(#|nan|nan, .*|n/a)$';
CREATE MACRO parse_nas(str) AS CASE
  WHEN str SIMILAR TO ' ^(
  #|nan|nan, .*|n/a)$' THEN NULL
  ELSE str
END;
CREATE MACRO str_to_year(str) AS TRY_CAST(left(str, 4) AS INTEGER);
---
CREATE OR REPLACE SEQUENCE event_id;
---
CREATE OR REPLACE TABLE events (
    id INTEGER PRIMARY KEY DEFAULT(nextval('event_id')),
    person_id INT,
    person_name VARCHAR,
    person_function VARCHAR,
    person_title VARCHAR,
    -- TODO: ask how to parse related persons
    related_persons VARCHAR,
    factoid_id VARCHAR [],
    event_type VARCHAR NOT NULL,
    event_value VARCHAR CHECK (length(event_value) == 1),
    event_before INT CHECK (
      event_before BETWEEN 1500 AND 1900
    ),
    event_after INT CHECK (
      event_after BETWEEN 1500 AND 1900
    ),
    event_start INT CHECK (
      event_start BETWEEN 1500 AND 1900
    ),
    event_end INT CHECK (
      event_end BETWEEN 1500 AND 1900
    ),
    institution_name VARCHAR,
    place_name VARCHAR,
    place_name_geonames VARCHAR,
    latitude FLOAT,
    longitude FLOAT,
    analytical_lense VARCHAR NOT NULL,
    source VARCHAR,
    source_quotations VARCHAR,
    comment VARCHAR
  );
--- TODO: use temp table or directly in insert statement
CREATE TABLE erfurt AS
SELECT CASE
    WHEN contains(pers_ID_FS, '?')
    OR pers_ID_FS = 'X' THEN NULL
    WHEN starts_with(pers_ID_FS, 'P-') THEN replace(pers_ID_FS, 'P-', '')
    ELSE pers_ID_FS
  END AS person_id,
  parse_nas(pers_name) AS person_name,
  parse_nas(pers_title) AS person_title,
  parse_nas(rel_pers) AS related_persons,
  str_split(factoid_id, ',') AS factoid_id,
  CASE
    WHEN str_to_year("event_before-date") < 1500 THEN null
    ELSE str_to_year("event_before-date")
  END AS event_before,
  CASE
    WHEN str_to_year("event_after-date") < 1500 THEN null
    ELSE str_to_year("event_after-date")
  END AS event_after,
  CASE
    WHEN str_to_year("event_start") < 1500 THEN null
    ELSE str_to_year("event_start")
  END AS event_start,
  CASE
    WHEN str_to_year("event_end") < 1500 THEN null
    ELSE str_to_year("event_end")
  END AS event_end,
  event_type,
  parse_nas(inst_name) AS institution_name,
  parse_nas(place_name) AS place_name,
  parse_nas("geonames address") AS place_name_geonames,
  parse_nas("comment") AS comment,
  --- TODO: check whether source combined is the correct column?
  parse_nas("source_combined") AS source,
  parse_nas("source_quotations") AS source_quotations,
  'state_calendar_erfurt' AS analytical_lense
FROM ST_Read(
    './data/Factoid_Staatskalender-Erfurt_consolidation_coordinates_event-values_person-IDs.xlsx',
    layer = 'FactCons1',
    open_options = ['HEADERS=FORCE']
  )
WHERE NOT is_na(event_type);
INSERT INTO events(
    person_id,
    person_name,
    person_title,
    related_persons,
    factoid_id,
    event_before,
    event_after,
    event_start,
    event_end,
    event_type,
    institution_name,
    place_name,
    place_name_geonames,
    source,
    source_quotations,
    comment,
    analytical_lense
  )
FROM erfurt;
-- CREATE OR REPLACE TABLE university_mainz
-- AS SELECT *
-- FROM st_read(
--   './data/Factoid_PROFS_v10_geocoded-with-IDs_v2.xlsx',
--   layer='FactCons',
--   open_options=['HEADERS=FORCE']
-- );
-- CREATE OR REPLACE TABLE jahns // AS
-- SELECT * //
-- FROM st_read(
--     // './data/Factoid_Jahns_consolidation_geocoded_personIDs_2614rows.xlsx',
--     // layer = 'FactCons1',
--     // open_options = ['HEADERS=FORCE'] //
--   );
--   CREATE OR REPLACE TABLE state_calendar_aschaffenburg
--   AS SELECT *
--   FROM st_read(
--     './data/Factoid_Staatskalender-Aschaffenburg_TEST.xlsx',
--     layer='FactCons1',
--     open_options=['HEADERS=FORCE']
--   );
-- 
--  CREATE OR REPLACE TABLE cathedral_provost_mainz
--  AS FROM './data/DigiKAR_geocoding_Clerics_1August2022.csv';
-- ALTER TABLE cathedral_provost_mainz DROP e_count;
-- ALTER TABLE cathedral_provost_mainz DROP s_count;
-- ALTER TABLE cathedral_provost_mainz RENAME '# Full Address' TO full_address;
-- ALTER TABLE cathedral_provost_mainz RENAME Longitude to longitude;
-- ALTER TABLE cathedral_provost_mainz RENAME Latitude to latitude;
----
-- CREATE OR REPLACE VIEW unique_places AS
-- SELECT FIRST("geonames address") AS place_name,
--   FIRST(ST_Point(longitudes::DOUBLE, latitudes::DOUBLE)) AS geom,
--   LIST(DISTINCT source) as sources,
--   Count(*)
-- FROM (
--     SELECT "geonames address",
--       longitudes,
--       latitudes,
--       'state_calendar_aschaffenburg' AS source
--     FROM state_calendar_aschaffenburg
--     UNION
--     SELECT "geonames address",
--       longitudes,
--       latitudes,
--       'state_calendar_erfurt' AS source
--     FROM state_calendar_erfurt
--     UNION
--     SELECT "geonames address",
--       longitudes,
--       latitudes,
--       'university_main' AS source
--     FROM university_mainz
--     UNION
--     SELECT "geonames address",
--       geonames_lng,
--       geonames_lat,
--       'jahns' AS source
--     FROM jahns
--   )
-- GROUP BY "geonames address";
.exit