import { writeFileSync } from "fs";
import loadPlaceOriginDeath from "./loadPlaceOriginDeath";
import { setupDb } from "./setup-db";

(async () => {
  const data = await loadPlaceOriginDeath();
  writeFileSync(
    "app/data/placeOriginDeath.json",
    JSON.stringify(data.objects())
  );
  await setupDb();
})();
