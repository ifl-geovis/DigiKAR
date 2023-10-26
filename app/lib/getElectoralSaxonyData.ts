import pool from "./pool";

const getElectoralSaxonyData = async () => {
  const result = await pool.query("SELECT * FROM gis.orte_features LIMIT 100;");
  return result.rows.map((d) => d.feature);
};

export default getElectoralSaxonyData;
