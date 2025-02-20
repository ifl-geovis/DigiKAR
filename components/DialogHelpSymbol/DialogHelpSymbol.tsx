import { FC } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const RightHelpSybol: FC = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Wie lese ich dieses Symbol?</DialogTitle>
        <DialogDescription>
          Die Verteilung der Rechte im Heiligen Römischen Reich war komplex. Wir
          haben ein Symbol erstellt, um diese komplexen Daten effektiv zu
          visualisieren. Hier erklären wir wie es funktioniert.
        </DialogDescription>
      </DialogHeader>
      <div className="[&_h2]:mt-5 [&_h2]:text-base [&_h2]:font-bold">
        <h2>Ein punkt-basierter Ansatz</h2>
        <p>Jeder Strahl des Symbols steht für ein Recht.</p>
        <p>Rechte können geteilt, umstritten oder unklar sein.</p>
      </div>
    </DialogContent>
  );
};

export default RightHelpSybol;
