import { writeFileSync } from "fs";
import loadPlaceOriginDeath from "./loadPlaceOriginDeath";

(async () => {
  const data = await loadPlaceOriginDeath();
  writeFileSync(
    "app/data/placeOriginDeath.json",
    JSON.stringify(data.objects())
  );
})();
