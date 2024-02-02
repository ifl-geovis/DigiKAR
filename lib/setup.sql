.open './data/digikar.duckdb';
---
SET extension_directory = './data';
INSTALL spatial;
LOAD spatial;
---
CREATE MACRO is_na(str) AS str SIMILAR TO '^(#|nan|nan, .*|n/a)$';
CREATE MACRO parse_nas(str) AS CASE
  WHEN str SIMILAR TO '^(#|nan|nan, .*|n/a)$' THEN NULL
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
    analytical_lense VARCHAR NOT NULL,
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
    WHEN contains(pers_ID_FS, '?')
    OR pers_ID_FS = 'X' THEN NULL
    WHEN starts_with(pers_ID_FS, 'P-') THEN replace(pers_ID_FS, 'P-', '')
    ELSE pers_ID_FS
  END AS person_id,
  parse_nas(pers_name) AS person_name,
  parse_nas(pers_function) AS person_function,
  parse_nas(pers_title) AS person_title,
  parse_nas(rel_pers) AS related_persons,
  str_split(factoid_id, ',') AS factoid_id,
  event_type,
  clamp_to_range(str_to_year("event_before-date")) AS event_before,
  clamp_to_range(str_to_year("event_after-date")) AS event_after,
  clamp_to_range(str_to_year("event_start")) AS event_start,
  clamp_to_range(str_to_year("event_end")) AS event_end,
  event_value,
  parse_nas(inst_name) AS institution_name,
  parse_nas(place_name) AS place_name,
  parse_nas("geonames address") AS place_name_geonames,
  point_or_null(longitudes, latitudes) AS place,
  parse_nas("comment") AS comment,
  --- TODO: check whether source combined is the correct column?
  parse_nas("source_combined") AS source,
  parse_nas("source_quotations") AS source_quotations,
  'state_calendar_erfurt' AS analytical_lense
FROM ST_Read(
    './data/Factoid_Staatskalender-Erfurt_consolidation_coordinates_event-values_person-IDs.xlsx',
    open_options = ['HEADERS=FORCE']
  )
WHERE NOT is_na(event_type);
--- parse spreadsheet university mainz
CREATE TEMP TABLE mainz AS
SELECT CASE
    WHEN contains(pers_ID, '?') THEN NULL
    ELSE pers_ID
  END AS person_id,
  parse_nas(pers_name) AS person_name,
  parse_nas(pers_title) AS person_title,
  parse_nas(pers_function) AS person_function,
  parse_nas(rel_pers) AS related_persons,
  str_split(factoid_ID, ',') AS factoid_id,
  event_type,
  clamp_to_range(str_to_year("event_before-date")) AS event_before,
  clamp_to_range(str_to_year("event_after-date")) AS event_after,
  clamp_to_range(str_to_year("event_start")) AS event_start,
  clamp_to_range(str_to_year("event_end")) AS event_end,
  event_value,
  parse_nas(inst_name) AS institution_name,
  parse_nas(place_name) AS place_name,
  parse_nas("geonames address") AS place_name_geonames,
  point_or_null(longitudes, latitudes) AS place,
  parse_nas("comment_fs") AS comment,
  parse_nas("source") AS source,
  parse_nas("source_quotations") AS source_quotations,
  'university_mainz' AS analytical_lense
FROM ST_Read(
    './data/Factoid_PROFS_v10_geocoded-with-IDs_v2.xlsx',
    open_options = ['HEADERS=FORCE']
  );
--- parse spreadsheet state calendar aschaffenburg
CREATE TEMP TABLE aschaffenburg AS
SELECT CASE
    WHEN contains(pers_ID, '?') THEN NULL
    ELSE pers_ID
  END AS person_id,
  parse_nas(pers_name) AS person_name,
  parse_nas(pers_title) AS person_title,
  parse_nas(pers_function) AS person_function,
  parse_nas(rel_pers) AS related_persons,
  NULL AS factoid_id,
  event_type,
  clamp_to_range(str_to_year("event_before-date")) AS event_before,
  clamp_to_range(str_to_year("event_after-date")) AS event_after,
  clamp_to_range(str_to_year("event_start")) AS event_start,
  clamp_to_range(str_to_year("event_end")) AS event_end,
  event_value,
  parse_nas(inst_name) AS institution_name,
  parse_nas(place_name) AS place_name,
  parse_nas("geonames address") AS place_name_geonames,
  point_or_null(longitudes, latitudes) AS place,
  parse_nas("comment") AS comment,
  --- TODO: check whether this is correct
  parse_nas("source_combined") AS source,
  parse_nas("source_quotations") AS source_quotations,
  'state_calendar_aschaffenburg' AS analytical_lense
FROM ST_Read(
    './data/Factoid_Staatskalender-Aschaffenburg_TEST.xlsx',
    open_options = ['HEADERS=FORCE']
  );
--- parse spreadsheet state_calendar jahns
CREATE TEMP TABLE jahns AS
SELECT CASE
    WHEN contains(pers_ID, '?') THEN NULL
    WHEN starts_with(pers_ID, 'P-') THEN replace(pers_ID, 'P-', '')
    ELSE pers_ID
  END AS person_id,
  parse_nas(pers_name) AS person_name,
  parse_nas(pers_title) AS person_title,
  parse_nas(pers_function) AS person_function,
  parse_nas(rel_pers) AS related_persons,
  str_split(factoid_ID, ',') AS factoid_id,
  event_type,
  clamp_to_range(str_to_year("event_before-date")) AS event_before,
  clamp_to_range(str_to_year("event_after-date")) AS event_after,
  clamp_to_range(str_to_year("event_start")) AS event_start,
  clamp_to_range(str_to_year("event_end")) AS event_end,
  --- TODO: check why not event_value
  NULL AS event_value,
  parse_nas(inst_name) AS institution_name,
  parse_nas(place_name) AS place_name,
  parse_nas("geonames address") AS place_name_geonames,
  point_or_null(geonames_lng, geonames_lat) AS place,
  parse_nas("comment") AS comment,
  parse_nas("source") AS source,
  parse_nas("source_quotations") AS source_quotations,
  'state_calendar_jahns' AS analytical_lense
FROM ST_Read(
    './data/Factoid_Jahns_consolidation_geocoded_personIDs_2614rows.xlsx',
    open_options = ['HEADERS=FORCE']
  );
INSERT INTO events(
    person_id,
    person_name,
    person_title,
    person_function,
    related_persons,
    factoid_id,
    event_type,
    event_before,
    event_after,
    event_start,
    event_end,
    event_value,
    institution_name,
    place_name,
    place_name_geonames,
    place,
    source,
    source_quotations,
    comment,
    analytical_lense
  )
FROM erfurt
UNION ALL
FROM mainz
UNION ALL
FROM aschaffenburg
UNION ALL
FROM jahns;
.exit