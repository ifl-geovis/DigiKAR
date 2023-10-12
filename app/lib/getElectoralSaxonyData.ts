import pool from "./pool";

const getElectoralSaxonyData = async () => {
  const result = await pool.query("SELECT * FROM gis.orte_json_export_v2");
  return result;
};

export default getElectoralSaxonyData;
