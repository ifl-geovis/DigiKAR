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
    id INTEGER PRIMARY KEY DEFAULT nextval('event_id'),
    person_id INT,
    person_name VARCHAR,
    person_function VARCHAR,
    person_title VARCHAR,
    -- TODO: ask how to parse related persons
    event_type VARCHAR NOT NULL,
    event_value VARCHAR CHECK (length(event_value) == 1),
    event_date INT,
    event_date_before INT,
    event_date_after INT,
    event_date_start INT,
    event_date_end INT,
    event_related_persons VARCHAR,
    event_source VARCHAR,
    event_source_quotations VARCHAR,
    event_source_comment VARCHAR,
    event_analytical_lens VARCHAR NOT NULL,
    institution_name VARCHAR,
    place_name VARCHAR,
    place GEOMETRY,
    CHECK (
      event_date BETWEEN 1400 AND 1900
      ANd event_date_start BETWEEN 1400 AND 1900
      ANd event_date_end BETWEEN 1400 AND 1900
      ANd event_date_before BETWEEN 1400 AND 1900
      AND event_date_after BETWEEN 1400 AND 1900
    )
  );
--- parse spreadsheet state_calendar erfurt
-- TODO: check why there are multiple factoid IDs per event
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
  nas_to_null(rel_pers) AS event_related_persons,
  event_type,
  clamp_to_range(str_to_year("event_before-date")) AS event_date_before,
  clamp_to_range(str_to_year("event_after-date")) AS event_date_after,
  event_value,
  nas_to_null(inst_name) AS institution_name,
  nas_to_null(trim("geonames address")) AS place_name,
  point_or_null(longitudes, latitudes) AS place,
  --- TODO: check whether source combined is the correct column?
  nas_to_null("source_combined") AS event_source,
  nas_to_null("comment") AS event_source_comment,
  'state_calendar_erfurt' AS event_analytical_lens,
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
  event_type,
  clamp_to_range(str_to_year("event_before-date")) AS event_date_before,
  clamp_to_range(str_to_year("event_after-date")) AS event_date_after,
  event_value,
  nas_to_null(inst_name) AS institution_name,
  nas_to_null(trim("geonames address")) AS place_name,
  -- nas_to_null("place_name") AS place_name,
  point_or_null(longitudes, latitudes) AS place,
  nas_to_null("comment_fs") AS event_source_comment,
  nas_to_null("source") AS event_source,
  'university_mainz' AS event_analytical_lens,
FROM ST_Read(
    './data/Factoid_PROFS_v10_geocoded-with-IDs_v2.xlsx',
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
  event_type,
  clamp_to_range(str_to_year("event_before-date")) AS event_date_before,
  clamp_to_range(str_to_year("event_after-date")) AS event_date_after,
  --- TODO: check why not event_value
  NULL AS event_value,
  nas_to_null(inst_name) AS institution_name,
  nas_to_null(trim("geonames address")) AS place_name,
  -- nas_to_null(place_name) AS place_name,
  point_or_null(geonames_lng, geonames_lat) AS place,
  nas_to_null("source") AS event_source,
  nas_to_null("comment") AS event_source_comment,
  'state_calendar_jahns' AS event_analytical_lens,
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
  event_type,
  NULL AS event_value,
  NULL AS event_date_before,
  NULL AS event_date_after,
  clamp_to_range(str_to_year("date_date")) AS event_date,
  nas_to_null(institution) AS institution_name,
  nas_to_null(trim(place_name_y)) AS place_name,
  -- nas_to_null(place_name_y) place_name_geonames,
  point_or_null(place_lng_geonames, place_lat_geonames) AS place,
  nas_to_null(source) AS event_source,
  nas_to_null(source_quotation) AS event_source_quotations,
  'students' AS event_analytical_lens,
FROM ST_Read(
    '/vsicurl/https://github.com/ieg-dhr/DigiKAR/raw/main/Consolidated%20data%20for%20visualisation/df_students_geocoded_v1.xlsx',
    open_options = ['HEADERS=FORCE']
  );

INSERT INTO events BY NAME
FROM erfurt
UNION ALL BY NAME
FROM mainz
UNION ALL BY NAME
FROM jahns
UNION ALL BY NAME
FROM students;
.exit