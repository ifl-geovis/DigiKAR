import PartnersGrid from "@/components/partners-grid";
import VideoLink from "@/components/VideoLink";
import { RxLayers, RxQuestionMark } from "react-icons/rx";

export default function Wp2() {
  return (
    <article className="flex justify-center">
      <div className="prose mx-5 max-w-prose py-20 [&>h3]:mt-10 [&>h4]:mt-5 [&>p]:mt-3">
        <h2 className="text-3xl font-normal">
          Plurale Verteilung von Herrschaftsrechten
        </h2>
        <h3>Inhaltsverzeichnis</h3>
        <ol className="my-3 list-decimal">
          <li>Einleitung</li>
          <li>Glossar</li>
          <li>Hinweise zur Bedienung</li>
        </ol>
        <h3>Einleitung</h3>
        <p>
          Die hier präsentierten Visualisierungen stellen die plurale Verteilung
          von Herrschaftsrechten im Raum anhand von mehreren Beispielregionen
          (Teile Kursachsen und Altlandkreis Ansbach in Franken) dar.
        </p>
        <p>
          Das Alte Reich war, wie andere frühneuzeitliche Herrschaftsräume auch,
          durch eine Vielzahl verteilter und geteilter Herrschaftsrechte
          gekennzeichnet. Es war weder ein Nationalstaat noch eine
          zentralistisch organisierte Monarchie, in der alle Rechte und
          Privilegien auf ein souveränes Machtzentrum zuliefen. Diese komplexe
          Ordnung ließ sich mit den herkömmlichen Methoden der
          Geschichtskartographie, die sich vor allem grafischer Mittel wie
          Flächen und Linien bediente, nur schwer abbilden. Denn eine solche
          Darstellung verlangt nach einer eindeutigen Zuordnung im territorialen
          Gefügen, die jedoch häufig nicht gegeben war, weil verschiedene Rechte
          über die Grenzen der Herrschaftsgebiete der einzelnen Reichsstände
          hinausreichten. Ein Untertan konnte im Alten Reich viele Herren haben
          – und ein Herr Untertanen auch in Territorien, in denen eigentlich ein
          anderer Potentat herrschte. Daraus folgte eine komplexe Vermischung
          von Herrschaftsrechten, die zwar nicht alle das gleiche Gewicht
          hatten, von denen aber keines alle anderen dominierte oder umfasste.
          Das galt auch für die „Landesherrschaft“ oder „Landeshoheit“, wie die
          Juristen seit dem 16. Jahrhundert das Recht eines Fürsten (oder eines
          anderen Territorialherrn) nannten, alle Menschen, die in dem ihm
          reichsrechtlich als Eigentum zugeordneten Gebiet lebten, als seine
          Untertanen anzusehen. Denn auch dieses Recht, das in der Regel mit der
          Reichsstandschaft (d.h. mit Sitz und Stimme auf dem Reichstag, dem
          kollektiven Entscheidungsorgan des Alten Reiches aus Kaiser und
          Reichsständen) verbunden war, schloss nicht aus, dass andere
          Herrschaftsrechte, z.B. die Gerichtsbarkeit, von einem anderen
          Herrschaftsträger ausgeübt wurden.
        </p>
        <p>
          Das Visualisierungstool von DigiKAR versucht, diese komplexe
          Verteilung von Herrschaftsrechten anhand ausgewählter Attribute
          exemplarisch darzustellen.{" "}
          <strong>
            Im Prototyp verfügbar sind aktuell Daten zu etwas mehr als 800 Orten
            (Gemeinden)
          </strong>
          , welche aus zwei Regionen stammen, die für zwei territoriale „Typen“
          des Alten Reichs stehen:
        </p>
        <ol className="my-10 list-decimal space-y-5 pl-10">
          <li>
            Mit <strong>Kursachsen</strong> wurde ein Reichsstand ausgewählt,
            der gemeinhin als relativ großes und geschlossenes Territorium gilt.
            Gleichzeitig war auch das Herrschaftsgebiet der Kurfürsten aus einer
            Vielzahl territorialer Einheiten zusammengesetzt („composite
            monarchie“), in denen verschiedene Verteilungen von
            Herrschaftsrechten zwischen der Landesherrschaft und mediaten
            Herrschaftsgewalten vorherrschten. Anhand von drei Beispielregionen
            soll dies sichtbar gemacht werden:
            <ul className="my-5 list-disc pl-10">
              <li>
                die Gegend um Meißen, die sich durch eine besonders kleinteilige
                Verteilung von Herrschaftsrechten zwischen mehreren
                landesherrlichen Ämtern (Erb- bzw. Kreisamt Meißen,
                Prokuraturamt Meißen, Stiftsamt Meißen, Schulamt Meißen) und
                damit innerhalb eines Territoriums auszeichnete,
              </li>
              <li>
                die Schönburgischen Herrschaften, die sich in die sogenannten
                „Lehnsherrschaften“ (kursächsische Lehen) und die sogenannten
                „Rezessherrschaften“ teilten, die ursprünglich böhmische bzw.
                kursächsische Reichsafterlehen waren, 1740 aber durch einen
                Rezess unter die sächsische „Oberbotmäßigkeit“ gezwungen wurden,
              </li>
              <li>
                das Gebiet um die Zisterzienserinnen-Abtei St. Marienstern, das
                Teil der von den sächsischen Kurfürsten ab 1635 in Personalunion
                regierten Oberlausitz war und als katholische „Glaubensinsel“
                inmitten eines weitgehend pro­testantisch gewordenen
                Territoriums lag.
              </li>
            </ul>
          </li>
          <li>
            Mit dem <strong>Altlandkreis Ansbach</strong> in Franken wird zudem
            die Verteilung von Herrschaftsrechten in einem Gebiet visualisiert,
            in dem sich drei Landesherrschaften vermischten: das Markgraftum
            Brandenburg-Ansbach, die Reichsstadt Nürnberg und der Deutsche
            Orden. Hinzu kamen zahlreiche Familien der Reichsritterschaft
            (Kanton Altmühl). Die Region steht damit beispielhaft für die
            territoriale „Kleinkammerung“ vieler Gegenden des Alten Reichs.
          </li>
        </ol>
        <p>
          Die der Visualisierung zugrunde liegenden Daten stammen aus
          verschiedenen Quellen: selbst erhobene Informationen (gedruckte
          Materialien und Archivdokumente), aber auch bereits vorhandene
          Ortsstatistiken und digitale Datenbanken. Wir danken insbesondere dem
          Institut für sächsische Geschichte und Volkskunde Dresden sowie der
          Kommission für bayerische Landesgeschichte bei der Bayerischen
          Akademie der Wissenschaften (Projekt „Historischer Atlas von Bayern“)
          für die freundliche Zurverfügungstellung von Daten und die fruchtbare
          Zusammenarbeit bei der Entwicklung des Tools. Für die gewährte
          Unterstützung bei den Endarbeiten am Visualisierungstool danken wir
          dem Institut franco-allemand de sciences historiques et sociales
          (IFRA-SHS) sowie der Goethe-Universität Frankfurt/M.
        </p>
        <PartnersGrid
          partners={[
            { name: "ISGV", image: "isgv.svg", href: "https://www.isgv.de/" },
            {
              name: "Institut Franco-Allemand",
              image: "ifra.svg",
              href: "https://ifra-francfort.fr/de",
            },
            {
              name: "Kommission für bayerische Landesgeschichte bei der Bayerischen Akademie der Wissenschaften",
              image: "kblg.svg",
              href: "https://kblg.badw.de/",
            },
          ]}
        />
        <h3 className="mt-10">Glossar</h3>
        <p>
          Aus arbeitsökonomischen Gründen ist die Zahl der Herrschaftsrechte,
          die aktuell im Visualisierungstool angezeigt und miteinander
          kombiniert werden können, beschränkt. Die Auswahl folgte pragmatischen
          Kriterien und insbesondere dem zur Verfügung stehenden Datenmaterial.
          Neben den im Folgenden erläuterten Rechten gab es noch eine ganze
          Reihe weiterer, die im Moment nicht berücksichtigt sind. Ihre
          nachträgliche Integration ist aufgrund der offenen Konstruktion des
          Tools prinzipiell jedoch möglich.
        </p>
        <div className="my-10 rounded-sm border-l-2 border-gray-200 bg-gray-50 p-10">
          <p>
            <strong>Wichtig!</strong>
            <br />
            Die folgenden Definitionen verstehen sich als allgemeine
            Beschreibungen, welche die im Visualisierungstool integrierten
            Herrschaftsrechte auch Nicht-Historikerinnen und -historikern
            verständlich machen wollen. Da der konkrete Inhalt der jeweiligen
            Rechte von Region zu Region variieren konnte, können sie eine
            genauere Beschäftigung mit ihnen jedoch nicht ersetzen.
          </p>
        </div>
        <h4>Dorf- und Gemeindeherrschaft</h4>
        <p>
          Die Dorf- und Gemeindeherrschaft bezeichnet in Franken die
          Gerichtsbarkeit und Policey-Gewalt über den genossenschaftlichen
          Besitz der dörflichen Gemeinden, also gemeindliche Straßen und Wege
          oder die Allmende (gemeinsam von allen Dorfmitgliedern genutzte
          Wiesen-, Wald- und Ackerflächen). Teil der Dorf- und
          Gemeindeherrschaft war auch die Aufsicht über die dörfliche
          Selbstverwaltung (Funktionsträger, Wirtschaftsführung) und die
          Überwachung der Hut- und Hirtenrechte. Begrenzt auf ihre
          jurisdiktionellen Funktionen (vogteiliche Gerichtsbarkeit) und
          aufgrund der starken Zersplitterung der Herrschaftsrechte in Franken
          wurde die Dorf- und Gemeindeherrschaft als ein Indikator für die
          Landeshoheit angesehen. Sie lag in der Regel bei dem
          Herrschaftsträger, welcher über die meisten Vogteiuntertanen verfügte.
        </p>
        <h4>Grundherrschaft</h4>
        <p>
          Grundherrschaft bezeichnet die unmittelbaren Herrschaftsrechte, die
          sich auf die Besitzverhältnisse im ländlichen Raum bezogen. In den
          Städten gab es in der Regel keine Grundherrschaft. Als abstrakter
          Sammelbegriff beschreibt sie die vielfältigen persönlichen
          Abhängigkeiten, die mit der Herrschaft über die auf dem Grund und
          Boden eines Grundherrn lebenden Menschen verbunden waren. Diese hatten
          das Land meist vom Grundherrn geliehen oder gepachtet und
          bewirtschafteten es, wofür sie Abgaben und Dienste zu leisten hatten.
          Darüber hinaus war die Grundherrschaft oft mit der Ausübung bestimmter
          Verwaltungs- und Gerichtsfunktionen verbunden. Grundherren konnten
          Landesherren sein, aber auch adelige Grundbesitzer, Städte sowie
          Korporationen (z.B. geistliche Institutionen wie Klöster oder Stifte,
          aber auch Universitäten oder Schulen). Daneben traten in einigen
          Regionen des Reichs ländliche Gemeinden und sogar Einzelpersonen (z.B.
          Bürger) als Grundherren auf.
        </p>
        <h4>Hochgericht</h4>
        <p>
          Die Hochgerichtsbarkeit beschreibt das Recht eines Herrschaftsträgers,
          schwere Straftaten wie Mord, Raub, Brandstiftung oder Notzucht
          (Vergewaltigung) gerichtlich zu verfolgen und die Delinquenten zu
          bestrafen. Sie wird auch als Blutgerichtsbarkeit bezeichnet, weil sie
          mit dem Recht verbunden war, schwere Sanktionen wie Körper-,
          Verstümmelungs- oder Todesstrafen zu verhängen und zu vollstrecken.
          Lange Zeit galt sie als das vornehmste Herrschaftsrecht, weshalb sie
          in einem engen Zusammenhang mit der Landesherrschaft bzw. -hoheit
          steht. Inhaber der Hochgerichtsbarkeit mussten aber nicht unbedingt
          Landesherren sein. Anzeiger der Hochgerichtsbarkeit war das
          Vorhandensein von Richtstätten (Galgen usw.), die eine wichtige Rolle
          bei der Abgrenzung territorialer Herrschaftsgebiete spielten. An
          manchen Orten wurde das Hochgericht im eigentlichen Dorf mit den
          Anwesen (Gemeinde) von einem anderen Inhaber ausgeübt als auf den
          umliegenden Feldern (Gemeindeflur).
        </p>
        <h4>Jagd</h4>
        <p>
          Mit dem Jagdrecht (auch „Wildbann“) ist das alleinige Recht eines
          Herrschaftsträgers gemeint, in einem bestimmten Gebiet Wild zu jagen.
          Seit dem Spätmittelalter stand es fast ausschließlich dem Adel zu,
          wobei die „hohe Jagd“ auf Rot- und Schwarzwild als ein
          landesherrliches Privileg galt, während niederadligen Grundherren
          meist nur die „niedere Jagd“ auf Füchse, Hasen oder Geflügel zukam.
          Den Untertanen in den Dörfern war in der Regel jegliche Form der Jagd
          streng untersagt, sie mussten dem jeweiligen Inhaber des Jagdrechts
          aber zahlreiche Hilfsdienste leisten.
        </p>
        <h4>Kirchenhoheit</h4>
        <p>
          Die Kirchenhoheit entwickelte sich im 15. Jahrhundert aus dem
          Bestreben weltlicher Herrscher, eine stärkere Kontrolle über die
          kirchlichen Angelegenheiten in ihren jeweiligen Territorien zu
          erlangen. Dazu zählten etwa die Aufsicht über das kirchliche Vermögen
          sowie die Einschränkung kirchlicher Gerichtsprivilegien. Im Ergebnis
          der Reformation übernahmen protestantische Fürsten, wie etwa die
          Markgrafen von Brandenburg-Ansbach, die Leitung der Kirche in ihrem
          Herrschaftsgebiet und führten das sogenannte landesherrliche
          Kirchenregiment ein.
        </p>
        <h4>Kirchenpatronat</h4>
        <p>
          Das Kirchenpatronat bezeichnet die Schirmherrschaft, die ein
          Herrschaftsträger über eine bestimmte Kirche ausübte. In
          protestantischen Gebieten stand sie in der Regel dem Landesherrn bzw.
          dem Landeskonsistorium zu. Verbunden mit ihm war zum Beispiel die
          Verpflichtung zur baulichen Erhaltung der Kirchengebäude; im Gegenzug
          kamen dem Kirchenpatron bestimmte Privilegien zu, etwa ein besonderer
          Platz in der Kirche oder das Recht, sich dort bestatten zu lassen.
          Teilweise waren das Kirchenpatronat mit dem Präsentationsrecht
          verbunden, also dem Vorrecht, bei einer Vakanz einen neuen Pfarrer
          vorzuschlagen.
        </p>
        <h4>Kollatur</h4>
        <p>
          Die Kollatur bezeichnet das Recht eines Herrschaftsträgers, eine
          geistliche Pfründe zu vergeben oder die Stelle eines Pfarrers zu
          besetzen. In diesem letzten Sinn wird es hier verwendet. Nach der
          Reformation kam in protestantischen Gegenden die Kollatur in der Regel
          dem Landesherrn bzw. den von ihm eingesetzten Konsistorien zu. In
          katholischen Gebieten blieb sie hingegen in der Hand einer Vielzahl
          von unterschiedlichen Herrschaftsträgern, wobei sie im engeren Sinne
          das Präsentationsrecht meinte, also die Befugnis, dem für die
          eigentliche Besetzung der Stelle zuständigen Bischof einen oder
          mehrere Kandidaten vorzuschlagen.
        </p>
        <h4>Landeshoheit bzw. Landesherrschaft</h4>
        <p>
          Mit dem Begriff Landeshoheit wurde seit dem 16. Jahrhundert das
          abstrakte Recht eines Landesherrn bezeichnet, die Oberhoheit über das
          von ihm beherrschte Land mit allen seinen Einwohnern zu beanspruchen.
          Was genau dieses Recht meinte und aus welchen anderen
          Herrschaftsrechten es sich gegebenenfalls ableiten ließ, war unter
          zeitgenössischen Juristen umstritten; eine allgemein verbindliche
          Definition der Landeshoheit gab es nicht. Das führte zu zahlreichen
          regional spezifischen Ausprägungen dieses Rechts und zu häufigen
          Auseinandersetzungen, wenn es von mehreren Herrschaftsträgern
          beansprucht wurde. In manchen Fällen ist es deshalb außerordentlich
          schwierig, den Inhaber der Landeshoheit eindeutig zu identifizieren,
          weil die Angaben in den Quellen nur der Selbstwahrnehmung des
          jeweiligen Herrschaftsträgers entsprechen, der sie für sich
          reklamierte. Auch war die Landeshoheit kein „höheres“
          Herrschaftsrecht, welches alle anderen gewissermaßen überwölbte, auch
          wenn sie (z.B. in Franken) mit anderen Rechten (etwa der
          Steuererhebung) verbunden sein konnte. Anders als in vielen
          herkömmlichen Geschichtskarten zum Alten Reich wird sie deshalb im
          Visualisierungstool nur als ein Herrschaftsrecht neben anderen
          behandelt.
        </p>
        <h4>Niedergericht</h4>
        <p>
          Die Niedergerichtsbarkeit umfasste in der Regel unbedeutendere
          Delikte, zum Beispiel Grenzstreitigkeiten, Wald- und Flurdiebstahl,
          Wirtshausraufereien ohne ernsthafte Verletzungen oder Beleidigungen.
          Daneben gehörte zu ihr die zivile bzw. bürgerliche Gerichtsbarkeit,
          die etwa für Erbschaftsangelegenheiten oder Besitzstreitigkeiten
          zuständig war. Die Inhaber des Niedergerichts konnten nur leichte
          Strafen verhängen, etwa Geldbußen, kurze Haftstrafen oder Ehrenstrafen
          wie das An-den-Pranger-Stellen. Die Anwendung der Folter bei der
          richterlichen Untersuchung sowie die Verhängung und Vollstreckung von
          Todesstrafen waren ihnen untersagt. Oft, aber nicht immer, war die
          niedere Gerichtsbarkeit mit der Grundherrschaft verbunden. In Ansbach
          war sie auch Teil der Vogtei. In Kursachsen wurde das Niedergericht an
          manchen Orten im eigentlichen Dorf mit den Anwesen (Gemeinde) von
          einem anderen Inhaber ausgeübt als auf den umliegenden Feldern
          (Gemeindeflur); in Franken trat an die Stelle dieser Unterscheidung
          die Differenz von „Niedergericht“ und „Vogtei außer Etters“.
        </p>
        <h4>Vogtei</h4>
        <p>
          „Vogtei“ ist ein schillernder Begriff der Verfassungsgeschichte des
          Alten Reichs. Während sie im Norden und Osten des Reichs vor allem das
          Schutzrecht weltlicher Herrschaftsträger über geistliche Institutionen
          wie Abteien meinte, war sie im Süden Teil der lokalen
          Herrschaftsrechte. In Franken spaltete sie sich im 16. Jahrhundert von
          der Hochgerichtsbarkeit ab und verband sich mit der grundherrlichen
          Niedergerichtsbarkeit, der Zivilgerichtsbarkeit, dem Steuer- sowie dem
          Policeyrecht über die Untertanen. Sie lag meist in der gleichen Hand
          wie die Grundherrschaft; nur mindermächtige Grundherren verfügten in
          der Regel über keine Vogteirechte (meist mediate Herrschaftsträger wie
          Klöster, Städte, Bürger, mildtätige Stiftungen oder einzelne
          Gemeinden). Unterschieden wurde zudem zwischen der Vogtei über die
          Anwesen und der „Vogtei außer Etters“, welche sich auf die außerhalb
          der Einfriedung des Ortes („Etter“) befindlichen Felder, Wiesen und
          Wälder bezog.
        </p>
        <h3>Hinweise zur Bedienung</h3>
        <h4>(1) Rechteverteilung im Alten Reich auf Ortsebene</h4>
        <p>
          Über den Button „Rechte“ oben links gelangen Sie zur Auswahl der
          beiden Karten zur Rechteverteilung auf Ortsebene (Gemeinden) bzw. auf
          Anwesenebene.
        </p>
        <p>
          Bei Klick auf „Rechteverteilung im Alten Reich auf Ortsebene“ öffnet
          sich eine Karte, die auf Dresden zentriert ist, den Hauptort des
          Kurfürstentums Sachsen. Die Zoomstufe ist auf einen Maßstab von etwa
          1:250.000 eingestellt (vgl. den Maßstabsbalken oben rechts). Der
          mittlere Zeitschieber am unteren Bildrand zeigt automatisch das
          Stichjahr 1800, mit einer Toleranz von +/- 25 Jahren (linker und
          rechter Schieber zur Festlegung von Beginn und Ende des anzuzeigenden
          Zeitraums). Die Legende auf der linken Seite ist geschlossen.
          Standardmäßig angezeigt wird eine Kombination aus vier
          Herrschaftsrechten: Hochgericht – Gemeinde (Anwesen) (Hg-A),
          Niedergericht (Ng), Grundherrschaft (Gh) und Landeshoheit (Lh)
          (angezeigt in der „Schneeflocke“ von oben im Uhrzeigersinn). Die
          Anzeige der Herrschaftsträger ist auf „kategorisiert“ eingestellt.
        </p>
        <p>
          Sie können sich in Abhängigkeit von Ihren Interessen frei in der Karte
          bewegen, um zu den einzelnen Beispielregionen zu gelangen, zoomen, die
          drei Zeitregler verstellen, die Legende öffnen und schließen sowie
          andere Klassifikationen der Herrschaftsträger wählen („normalisiert“
          oder „übergeordnet“). Auch ist es möglich, die Einstellungen des
          Symbols für die Anzeige der einzelnen Rechte zu verändern; beim Klick
          auf <RxQuestionMark className="inline align-baseline text-xs" />{" "}
          erhalten Sie detailliertere Erläuterungen. Zudem können Sie (nur für
          Kursachsen) weitere Kartenlayer einblenden, wenn Sie oben rechts auf
          das Ebenensymbol (
          <RxLayers className="inline align-baseline text-xs" />) klicken.
          Anzeigen lassen sich derzeit die sogenannten „Kursächsischen
          Meilenblätter (Berliner Exemplar)“, eine topographische Landesaufnahme
          aus den Jahren 1780–1825 (weitere Informationen dazu finden Sie{" "}
          <a
            className="underline"
            href="https://de.wikipedia.org/wiki/Meilenbl%C3%A4tter_von_Sachsen"
          >
            hier
          </a>
          ), eine exemplarische Auswahl von Standorten von Richtstätten (Galgen)
          sowie eine aus dem „Atlas für Geschichte und Landeskunde von Sachsen“
          stammende Darstellung von historischen Flussläufen und Seen.
        </p>
        <p>Die folgenden Videos erläutern die einzelnen Elemente genauer:</p>
        <ol className="my-5 list-decimal pl-10">
          <li>
            Karte aufrufen, Bewegung in der Karte, Zoomen, Anzeige der
            Grundkarte, Funktionen der Legende, Anzeige einzelner Rechte auf
            Ortsebene. <VideoLink label="Tutorial 1" id="1057414723" />
          </li>
          <li>
            Einstellungen der Zeitregler{" "}
            <VideoLink label="Tutorial 2" id="1057414774" />
          </li>
          <li>
            Veränderungen des Symbols für die Anzeige einzelner Rechte
            <VideoLink label="Tutorial 3" id="1057414750" />
          </li>
        </ol>

        <h3>(2) Rechteverteilung auf Anwesenebene</h3>
        <p>
          Über den Button „Rechte“ oben links gelangen Sie ebenso zur Karte
          „Anwesen in Höflein. Rechteverteilung auf Anwesenebene“.
        </p>
        <p>
          Die sich öffnende Karte ist auf Höflein zentriert, ein Dorf in der
          Oberlausitz, für das eine Kartierung einiger Herrschaftsrechte auf
          Anwesenebene vorliegt. Die voreingestellte Zoomstufe entspricht
          ungefähr einem Maßstab von 1:15.000. Die Legende auf der linken Seite
          ist geschlossen. Sie können sich in der Karte bewegen, hineinzoomen,
          die Legende öffnen und schließen sowie weitere Kartenlayer einblenden
          (oben rechts auf das Ebenensymbol{" "}
          <RxLayers className="inline align-baseline text-xs" /> klicken). Sie
          haben dort die Möglichkeit, den entsprechenden Ausschnitt der
          „Kursächsischen Meilenblätter (Berliner Exemplar, Blatt 289)
          anzuzeigen. Wir danken herzlich Eckart Kliemann (Höflein), der uns
          freundlicherweise seine Daten für die Visualisierung zur Verfügung
          gestellt hat.
        </p>
        <p>
          Die Visualisierung beschränkt sich im Moment auf zwei Rechte:
          Grundherrschaft und Niedergericht (die jeweils in derselben Hand
          lagen). Weitere Hinweise, u.a. zur Legende, erhalten Sie im Video
        </p>
        <VideoLink label="Tutorial 4" id="1057414801" />
        <p>
          Aufgrund der zahlreichen Schwierigkeiten, die mit einer anwesengenauen
          Zuordnung von Herrschaftsrechten im Alten Reich verbunden sind, bedarf
          die Darstellung weiterer Überlegungen und Arbeitsschritte, bevor sie
          als ausgereift gelten kann. Im Moment soll sie lediglich die
          Potentiale einer solchen Form der Visualisierung andeuten, die
          perspektivisch in eine einzige zoombare Anwendung gemeinsam mit der
          Ortsdarstellung (Gemeinden) integriert werden soll.
        </p>
      </div>
    </article>
  );
}
