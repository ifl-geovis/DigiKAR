import pool from "./pool";

export const getRecordsPerYear = async () => {
  const res = await pool.query(`
          WITH orte_jahre AS (
              SELECT a.ortsname_digikar,
                  'Verwaltungszugehörigkeit' AS right_type,
                  jahr
              FROM gis.orte a
              LEFT JOIN gis.verwaltungzugehoerigkeit b ON a.uuid = b.orte_uuid
              UNION ALL
              SELECT a.ortsname_digikar,
                  'Grundherrschaft' AS right_type,
                  jahr
              FROM gis.orte a
              LEFT JOIN gis.grundherrschaft b ON a.uuid = b.orte_uuid
              UNION ALL
              SELECT a.ortsname_digikar,
                  'Hochgericht' AS right_type,
                  jahr
              FROM gis.orte a
              LEFT JOIN gis.hochgericht b ON a.uuid = b.orte_uuid
              UNION ALL
              SELECT a.ortsname_digikar,
                  'Niedergericht' AS right_type,
                  jahr
              FROM gis.orte a
              LEFT JOIN gis.niedergericht b ON a.uuid = b.orte_uuid
              UNION ALL
              SELECT a.ortsname_digikar,
                  'Landeshoheit' AS right_type,
                  jahr
              FROM gis.orte a
              LEFT JOIN gis.landeshoheit b ON a.uuid = b.orte_uuid
          )
          SELECT CAST(jahr AS INT) AS jahr,
              right_type,
              CAST(COUNT(*) AS INT) as count
          FROM orte_jahre
          WHERE jahr ~ '^\\d{4}$'
          GROUP BY jahr, right_type
          ORDER BY jahr, right_type;
      `);

  //   const res = await pool.query(`
  //     SELECT * FROM gis.orte;
  //     `);
  return res.rows;
};
