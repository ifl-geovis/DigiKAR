.open './data/digikar.duckdb';
---
SET extension_directory = './data/.duckdb/extensions';
INSTALL spatial;
LOAD spatial;
---
CREATE MACRO is_na(str) AS str SIMILAR TO '^(#|\?|nan|nan, .*|n/a)$';
CREATE MACRO nas_to_null(str) AS CASE
  WHEN is_na(str) THEN NULL
  ELSE str
END;
CREATE MACRO str_to_year(str) AS TRY_CAST(left(str, 4) AS INTEGER);
CREATE MACRO is_in_range(year) AS year BETWEEN 1400 and 1900;
CREATE MACRO clamp_to_range(year) AS CASE
  WHEN is_in_range(year) THEN year
  ELSE NULL
END;
CREATE MACRO point_or_null(longitude, latitude) AS CASE
  WHEN TRY_CAST(longitude AS DOUBLE)
  AND TRY_CAST(latitude AS DOUBLE) THEN ST_Point(longitude::DOUBLE, latitude::DOUBLE)
  ELSE NULL
END;
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
    event_before INT,
    event_after INT,
    event_start INT,
    event_end INT,
    institution_name VARCHAR,
    place_name VARCHAR,
    place_name_geonames VARCHAR,
    place GEOMETRY,
    source VARCHAR,
    source_quotations VARCHAR,
    comment VARCHAR,
    analytical_lens VARCHAR NOT NULL,
    CHECK (
      event_before BETWEEN 1400 AND 1900
      AND event_after BETWEEN 1400 AND 1900
      AND event_start BETWEEN 1400 AND 1900
      AND event_end BETWEEN 1400 AND 1900
    )
  );
--- parse spreadsheet state_calendar erfurt
CREATE TEMP TABLE erfurt AS
SELECT CASE
    WHEN contains(pers_ID_FS::VARCHAR, '?'::VARCHAR)
    OR pers_ID_FS = 'X' THEN NULL
    WHEN starts_with(pers_ID_FS, 'P-') THEN replace(pers_ID_FS, 'P-', '')
    ELSE pers_ID_FS
  END AS person_id,
  nas_to_null(pers_name) AS person_name,
  nas_to_null(pers_function) AS person_function,
  nas_to_null(pers_title) AS person_title,
  nas_to_null(rel_pers) AS related_persons,
  str_split(factoid_id, ',') AS factoid_id,
  event_type,
  clamp_to_range(str_to_year("event_before-date")) AS event_before,
  clamp_to_range(str_to_year("event_after-date")) AS event_after,
  clamp_to_range(str_to_year("event_start")) AS event_start,
  clamp_to_range(str_to_year("event_end")) AS event_end,
  event_value,
  nas_to_null(inst_name) AS institution_name,
  nas_to_null(place_name) AS place_name,
  nas_to_null("geonames address") AS place_name_geonames,
  point_or_null(longitudes, latitudes) AS place,
  nas_to_null("comment") AS comment,
  --- TODO: check whether source combined is the correct column?
  nas_to_null("source_combined") AS source,
  nas_to_null("source_quotations") AS source_quotations,
  'state_calendar_erfurt' AS analytical_lens
FROM ST_Read(
    './data/Factoid_Staatskalender-Erfurt_consolidation_coordinates_event-values_person-IDs.xlsx',
    open_options = ['HEADERS=FORCE']
  )
WHERE NOT is_na(event_type);
--- parse spreadsheet university mainz
CREATE TEMP TABLE mainz AS
SELECT CASE
    WHEN contains(pers_ID::VARCHAR, '?'::VARCHAR) THEN NULL
    ELSE pers_ID
  END AS person_id,
  nas_to_null(pers_name) AS person_name,
  nas_to_null(pers_title) AS person_title,
  nas_to_null(pers_function) AS person_function,
  nas_to_null(rel_pers) AS related_persons,
  [factoid_ID] AS factoid_id,
  event_type,
  clamp_to_range(str_to_year("event_before-date")) AS event_before,
  clamp_to_range(str_to_year("event_after-date")) AS event_after,
  clamp_to_range(str_to_year("event_start")) AS event_start,
  clamp_to_range(str_to_year("event_end")) AS event_end,
  event_value,
  nas_to_null(inst_name) AS institution_name,
  nas_to_null(place_name) AS place_name,
  nas_to_null("geonames address") AS place_name_geonames,
  point_or_null(longitudes, latitudes) AS place,
  nas_to_null("comment_fs") AS comment,
  nas_to_null("source") AS source,
  nas_to_null("source_quotations") AS source_quotations,
  'university_mainz' AS analytical_lens
FROM ST_Read(
    './data/Factoid_PROFS_v10_geocoded-with-IDs_v2.xlsx',
    open_options = ['HEADERS=FORCE']
  );
--- parse spreadsheet state calendar aschaffenburg
CREATE TEMP TABLE aschaffenburg AS
SELECT CASE
    WHEN contains(pers_ID::VARCHAR, '?'::VARCHAR) THEN NULL
    ELSE pers_ID
  END AS person_id,
  nas_to_null(pers_name) AS person_name,
  nas_to_null(pers_title) AS person_title,
  nas_to_null(pers_function) AS person_function,
  nas_to_null(rel_pers) AS related_persons,
  NULL AS factoid_id,
  event_type,
  clamp_to_range(str_to_year("event_before-date")) AS event_before,
  clamp_to_range(str_to_year("event_after-date")) AS event_after,
  clamp_to_range(str_to_year("event_start")) AS event_start,
  clamp_to_range(str_to_year("event_end")) AS event_end,
  event_value,
  nas_to_null(inst_name) AS institution_name,
  nas_to_null(place_name) AS place_name,
  nas_to_null("geonames address") AS place_name_geonames,
  point_or_null(longitudes, latitudes) AS place,
  nas_to_null("comment") AS comment,
  --- TODO: check whether this is correct
  nas_to_null("source_combined") AS source,
  nas_to_null("source_quotations") AS source_quotations,
  'state_calendar_aschaffenburg' AS analytical_lens
FROM ST_Read(
    './data/Factoid_Staatskalender-Aschaffenburg_TEST.xlsx',
    open_options = ['HEADERS=FORCE']
  );
--- parse spreadsheet state_calendar jahns
CREATE TEMP TABLE jahns AS
SELECT CASE
    WHEN contains(pers_ID::VARCHAR, '?'::VARCHAR) THEN NULL
    WHEN starts_with(pers_ID, 'P-') THEN replace(pers_ID, 'P-', '')
    ELSE pers_ID
  END AS person_id,
  nas_to_null(pers_name) AS person_name,
  nas_to_null(pers_title) AS person_title,
  nas_to_null(pers_function) AS person_function,
  nas_to_null(rel_pers) AS related_persons,
  [factoid_ID] AS factoid_id,
  event_type,
  clamp_to_range(str_to_year("event_before-date")) AS event_before,
  clamp_to_range(str_to_year("event_after-date")) AS event_after,
  clamp_to_range(str_to_year("event_start")) AS event_start,
  clamp_to_range(str_to_year("event_end")) AS event_end,
  --- TODO: check why not event_value
  NULL AS event_value,
  nas_to_null(inst_name) AS institution_name,
  nas_to_null(place_name) AS place_name,
  nas_to_null("geonames address") AS place_name_geonames,
  point_or_null(geonames_lng, geonames_lat) AS place,
  nas_to_null("comment") AS comment,
  nas_to_null("source") AS source,
  nas_to_null("source_quotations") AS source_quotations,
  'state_calendar_jahns' AS analytical_lens
FROM ST_Read(
    './data/Factoid_Jahns_consolidation_geocoded_personIDs_2614rows.xlsx',
    open_options = ['HEADERS=FORCE']
  );
-- parse spreadsheet student data
CREATE TEMP TABLE students AS
SELECT
  999999999 AS person_id,
  --CASE
  --  WHEN contains(pers_ID::VARCHAR, '?'::VARCHAR) THEN NULL
  --  WHEN starts_with(pers_ID, 'P-') THEN replace(pers_ID, 'P-', '')
  --  ELSE pers_ID
  -- END
  nas_to_null(person_name) AS person_name,
  nas_to_null(person_title) AS person_title,
  nas_to_null(person_function) AS person_function,
  nas_to_null(event_related_person) AS related_persons,
  [event_id] AS factoid_id,
  event_type,
  NULL AS event_value,
  NULL AS event_before,
  NULL AS event_after,
  clamp_to_range(str_to_year("date_date")) AS event_start,
  NULL AS event_end,
  nas_to_null(institution) AS institution_name,
  nas_to_null(place_name_y) AS place_name,
  nas_to_null(place_name_y) place_name_geonames,
  point_or_null(place_lng_geonames, place_lat_geonames) AS place,
  nas_to_null(source) AS source,
  nas_to_null(source_quotation) AS source_quotations,
  NULL AS comment,
  'students' AS analytical_lens
FROM ST_Read(
    '/vsicurl/https://github.com/ieg-dhr/DigiKAR/raw/main/Consolidated%20data%20for%20visualisation/df_students_geocoded_v1.xlsx',
    open_options = ['HEADERS=FORCE']
  );

INSERT INTO events BY NAME
FROM erfurt
UNION ALL BY NAME
FROM mainz
UNION ALL BY NAME
FROM aschaffenburg
UNION ALL BY NAME
FROM jahns
UNION ALL BY NAME
FROM students;
.exit