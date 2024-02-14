import pool from "./pool";

const getElectoralSaxonyData = async (limit = 100) => {
  const result = await pool.query(
    `SELECT * FROM gis.orte_features LIMIT ${limit};`,
  );
  return result.rows.map((d) => d.feature);
};

export default getElectoralSaxonyData;
