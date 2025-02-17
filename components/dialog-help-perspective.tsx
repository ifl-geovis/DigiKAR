import { FC } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const RightHelpSybol: FC = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Was bedeutet <em>Perspektive</em>?
        </DialogTitle>
        <DialogDescription>
          The Verteilung der Rechte im Heiligen Römischen Reich war komplex. Es
          ist daher hilfreich aus unterschiedlichen Perspektiven auf die
          Rechteinhaber zu blicken.
        </DialogDescription>
      </DialogHeader>
      <div className="[&_h2]:mt-5 [&_h2]:text-base [&_h2]:font-bold">
        <h2>Unterschiedliche Perspektiven auf Rechteinhaber </h2>
        <p>
          Die Karte bietet daher die Möglichkeit je Recht (z. B. Niedergericht)
          den
        </p>
        <ol className="list-inside list-disc">
          <li>konkreten Rechteinhaber</li>
          <li>eine zugeordnete Kategorie</li>
          <li>den übergeordneten Herrschaftsträger</li>
        </ol>
        <p>anzeigen zu lassen.</p>
        <p>
          Der konkrete Rechteinhaber kann dabei entweder eine Körperschaft oder
          eine Person sein. Die Kategorien lehnen sich an übliche Kategorien an.
        </p>
      </div>
    </DialogContent>
  );
};

export default RightHelpSybol;
