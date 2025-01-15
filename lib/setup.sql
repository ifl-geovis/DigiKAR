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
  WHEN
    longitude != 'nan'
    AND latitude != 'nan'
    AND TRY_CAST(longitude AS DOUBLE)
    AND TRY_CAST(latitude AS DOUBLE)
  THEN ST_Point(longitude::DOUBLE, latitude::DOUBLE)
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
    event_type VARCHAR NOT NULL,
    event_value VARCHAR CHECK (length(event_value) == 1),
    event_date INT,
    event_date_before INT,
    event_date_after INT,
    event_date_start INT,
    event_date_end INT,
    -- TODO: ask how to parse related persons
    event_related_persons VARCHAR,
    event_source VARCHAR,
    event_source_quotations VARCHAR,
    event_editorial_comment VARCHAR,
    event_source_comment VARCHAR,
    event_analytical_lens VARCHAR NOT NULL,
    institution_name VARCHAR,
    place_name VARCHAR,
    place GEOMETRY,
    CHECK (
      event_date BETWEEN 1000 AND 1900
      ANd event_date_start BETWEEN 1000 AND 1900
      ANd event_date_end BETWEEN 1000 AND 1900
      ANd event_date_before BETWEEN 1000 AND 1900
      AND event_date_after BETWEEN 1000 AND 1900
    )
  );
--- parse spreadsheet of analytical lens Staatskalender Erfurt
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
  'Staatskalender Erfurt' AS event_analytical_lens,
FROM ST_Read(
    '/vsicurl/https://github.com/ieg-dhr/DigiKAR/raw/main/Consolidated%20data%20for%20visualisation/staatskalender_erfurt.xlsx',
    open_options = ['HEADERS=FORCE']
  )
WHERE NOT is_na(event_type);
--- parse spreadsheet of analytical lens Reichskammergericht
CREATE TEMP TABLE reichskammergericht AS
SELECT
  person_id_1 AS person_id,
  person_name,
  person_function,
  person_title,
  event_type,
  nas_to_null(event_value) AS event_value,
  str_to_year(event_date) AS event_date,
  str_to_year(event_date_before) AS event_date_before,
  str_to_year(event_date_after) AS event_date_after,
  str_to_year(event_date_start) AS event_date_start,
  str_to_year(event_date_end) AS event_date_end,
  event_related_persons,
  event_source,
  event_source_quotations,
  event_editorial_comment,
  event_source_comment,
  'Reichskammergericht' AS event_analytical_lens,
  institution_name,
  place_name,
  point_or_null(place_geonames_longitude, place_geonames_latitude) AS place
FROM ST_Read(
    '/vsicurl/https://github.com/ieg-dhr/DigiKAR/raw/main/Consolidated%20data%20for%20visualisation/reichskammergericht.xlsx',
    open_options = ['HEADERS=FORCE']
  );
-- parse spreadsheet of analytical lens Universität Mainz Studierende
CREATE TEMP TABLE students AS
SELECT
  Field1 AS person_id,
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
  'Universität Mainz Studierende' AS event_analytical_lens,
FROM ST_Read(
  '/vsicurl/https://github.com/ieg-dhr/DigiKAR/raw/main/Consolidated%20data%20for%20visualisation/universitaet_mainz_studierende.xlsx',
  open_options = ['HEADERS=FORCE']
);
-- parse spreadsheet of analytical lens Domkapitulare Mainz
CREATE TEMP TABLE domkapitulare_mainz AS
SELECT
  replace(right(person_id, 9), '-', '') as person_id,
  person_name,
  person_function
  person_title,
  'Funktionsausübung' AS event_type,
  event_value,
  event_date_start,
  event_date_end,
  event_source,
  institution_name,
  place_name,
  point_or_null(place_geonames_longitude, place_geonames_latitude) AS place,
  'Domkapitulare Mainz' AS event_analytical_lens
FROM 'https://github.com/ieg-dhr/DigiKAR/raw/main/Consolidated%20data%20for%20visualisation/domkapitulare_mainz.csv';

INSERT INTO events BY NAME
FROM erfurt
UNION ALL BY NAME
FROM reichskammergericht
UNION ALL BY NAME
FROM students
UNION ALL BY NAME
FROM domkapitulare_mainz;
.exit