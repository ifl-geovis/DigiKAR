import workbookFromXlsx from "./workbookFromXlsx";
import parseSheet from "./parseSheet";
import { BioEvent } from "../types/BioEvent";

const loadUniversityData = async () => {
  const workbook = await workbookFromXlsx(
    "./app/data/Factoid_PROFS_v10_geocoded-with-IDs_v2.xlsx"
  );
  return parseSheet<BioEvent[]>(workbook.worksheets[0]);
};

export default loadUniversityData;
