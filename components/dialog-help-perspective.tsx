import { FC } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const RightHelpSybol: FC = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Was bedeutet <em>Herrschaftsträger</em>?
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-2 [&_h2]:mt-5 [&_h2]:text-base [&_h2]:font-bold">
        <p>
          Unter Herrschaftsträgern werden Körperschaften (z.B. ein fürstliches
          Amt oder ein Rittergut) bzw. Personen (z.B. ein Rittergutsbesitzer)
          verstanden, die ein bestimmtes Herrschaftsrecht ausübten.
        </p>
        <p>
          Das Menü erlaubt, zwischen verschiedenen Klassifikationen auszuwählen:
        </p>
        <ol className="my-3 list-inside list-disc">
          <li>
            <strong>kategorisiert</strong> – die Herrschaftsträger sind nach
            Kategorien (z.B. weltliche Kurfürsten, Reichsritterschaft) geordnet,
          </li>
          <li>
            <strong>normalisiert</strong> – die Herrschaftsträger werden
            einzeln, aber mit normalisierten Bezeichnungen angezeigt
            (unterschiedliche Schreibweisen in den Quellen z.B. werden nicht
            berücksichtigt),
          </li>
          <li>
            <strong>übergeordnet</strong> – die Herrschaftsträger sind einer
            übergeordneten Herrschaftseinheit zugeordnet, die i.d.R. die
            Landesherrschaft ausübt.
          </li>
        </ol>
        <p>
          Jede Klassifikation entspricht einer eigenen Legende. Die konkreten
          Inhaber der einzelnen Herrschaftsrechte (inklusive der detaillierten
          Quellenangabe) sind in der Orts-Legende aufgeführt, die sich beim
          Klick auf jeden einzelnen Punkt öffnet.
        </p>
      </div>
    </DialogContent>
  );
};

export default RightHelpSybol;
