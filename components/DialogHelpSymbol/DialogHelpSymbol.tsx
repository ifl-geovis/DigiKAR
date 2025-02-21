import { FC } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const RightHelpSybol: FC = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Interpretation des mehrstrahligen Symbols</DialogTitle>
      </DialogHeader>
      <div className="space-y-2 [&_h2]:mt-5 [&_h2]:text-base [&_h2]:font-bold">
        <p>
          Die räumliche Verteilung von Herrschaftsrechten war im frühmodernen
          Alten Rein von einer Komplexität geprägt, die sich mit herkömmlichen
          Flächenkarten nur schwer wiedergeben lässt. Der Fokus dieser Karte
          liegt deshalb auf den einzelnen Ortschaften.
        </p>
        <p>
          Das mehrstrahlige Symbol erlaubt es, für jeden Ort mehrere
          Herrschaftsrechte einzeln oder in Kombination anzuzeigen, wobei jeder
          Kreis für ein Recht steht. Welcher Punkt welches Recht symbolisiert,
          lässt sich individuell einstellen und wird auf der linken Seite über
          Abkürzungen angezeigt. Farbige Kreise entsprechen Herrschaftsträgern,
          die aus der Legende links ermittelt werden können. Kreise mit Zeichen
          deuten auf geteilte, umstrittene oder unklare Rechte hin. Neben der
          Möglichkeit, die Rechteverteilung für einzelne Orte im Detail
          anzuzeigen, bietet die Karte auch die Möglichkeit, die Verteilung
          regional über eine größere Anzahl von Orten hinweg sichtbar zu machen.
        </p>
      </div>
    </DialogContent>
  );
};

export default RightHelpSybol;
