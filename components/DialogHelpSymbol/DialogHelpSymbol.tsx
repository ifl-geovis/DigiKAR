import { FC } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const RightHelpSybol: FC = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Einstellungen des mehrstrahligen Symbols („Schneeflocke“)
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-2 [&_h2]:mt-5 [&_h2]:text-base [&_h2]:font-bold">
        <p>
          Die räumliche Verteilung von Herrschaftsrechten war im frühmodernen
          Alten Rein von einer Komplexität geprägt, die sich mit herkömmlichen
          Flächenkarten nur schwer wiedergeben lässt. Der Fokus dieser Karte
          liegt deshalb auf den einzelnen Ortschaften.
        </p>
        <p>
          Das mehrstrahlige Symbol („Schneeflocke“) erlaubt es, für jeden Ort
          mehrere Herrschaftsrechte einzeln oder in Kombination einzublenden,
          wobei jeder Kreis für ein Recht steht. Welcher Punkt welches Recht
          symbolisiert, lässt sich individuell einstellen und wird auf der
          linken Seite über Abkürzungen angezeigt. Wenn sie auf eine dieser
          Abkürzungen selbst klicken, lassen sich sowohl die Position des Rechts
          innerhalb der „Schneeflocke“ als auch das Symbol (Kreis oder Quadrat)
          ändern, um individuellen Forschungsbedürfnissen genügende
          Visualisierungen zu erzeugen.
        </p>
        <p>
          Farbige Kreise (oder Quadrate) entsprechen Herrschaftsträgern, die aus
          der Legende links ermittelt werden können. Eigene Symbole deuten auf
          geteilte, umstrittene oder unklare Rechte hin. Neben der Möglichkeit,
          die Rechteverteilung für einzelne Orte im Detail anzuzeigen, bietet
          die Karte auch die Möglichkeit, die Verteilung regional über eine
          größere Anzahl von Orten hinweg sichtbar zu machen.
        </p>
      </div>
    </DialogContent>
  );
};

export default RightHelpSybol;
