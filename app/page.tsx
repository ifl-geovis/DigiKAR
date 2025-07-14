import PartnersGrid from "@/components/partners-grid";

export default function Home() {
  return (
    <article className="prose mx-auto my-5 max-w-prose px-4 md:px-0 [&_>_p]:mb-3">
      <h2 className="text-3xl font-normal">
        Prototyp für eine moderne Geschichtskartographie des Alten Reiches
      </h2>
      <p className="mb-4 text-xl">
        Dieser Prototyp eines Visualisierungstools ist aus dem Projekt „Digitale
        Kartenwerkstatt Altes Reich“ (
        <a href="https://ieg-dhr.github.io/DigiKAR/">DigiKAR</a>)
        hervorgegangen. Das Projekt hatte zum Ziel, traditionelle Ansätze der
        Geschichtskartographie zum Heiligen Römischen Reich deutscher Nation
        (oder „Alten Reich“) in der Frühen Neuzeit zu überwinden.
      </p>
      <p>
        Explorativ erkundet werden sollten stattdessen mit den Mitteln der
        webbasierten Kartographie die Möglichkeiten einer punktbasierten
        Visualisierung mit dem Schwerpunkt auf zwei Bereiche: (1) die plurale
        Verteilung von Herrschaftsrechten in und zwischen den Territorien des
        Alten Reichs und (2) Formen der Mobilität innerhalb und zwischen
        verschiedenen territorialen Räumen.
      </p>
      <p>
        Der Prototyp richtet sich nicht an die allgemeine Öffentlichkeit,
        sondern ist für die fachinterne Diskussion zwischen Historikerinnen und
        Historikern, Informationswissenschaftlerinnen und -wissenschaftlern
        sowie Kartographinnen und Kartographen bestimmt. Er stellt kein
        abgeschlossenes Arbeitsergebnis dar, sondern befindet sich weiterhin in
        Entwicklung und kann daher Fehler („Bugs“) enthalten.
      </p>
      <h3>Plurale Verteilung von Herrschaftsrechten</h3>
      <p>
        Das Alte Reich war, wie andere frühneuzeitliche Herrschaftsräume auch,
        durch eine Vielzahl verteilter und geteilter Herrschaftsrechte
        gekennzeichnet. Es war weder ein Nationalstaat noch eine zentralistisch
        organisierte Monarchie, in der alle Rechte und Privilegien auf ein
        souveränes Machtzentrum zuliefen. Diese komplexe Ordnung ließ sich mit
        den herkömmlichen Mitteln der Geschichtskartographie, die sich vor allem
        grafischer Mittel wie Flächen und Linien bediente, nur schwer
        darstellen. Denn viele Herrschaftsrechte reichten über die Grenzen der
        einzelnen Territorien der Reichsstände hinaus. Ein Untertan konnte im
        Alten Reich viele Herren haben – und ein Herr Untertanen auch in
        Gebieten, in denen eigentlich ein anderer Potentat herrschte. Das lag am
        Mit- und Nebeneinander vieler Herrschaftsrechte, die zwar nicht alle das
        gleiche Gewicht hatten, von denen aber keines alle anderen dominierte
        oder umfasste. Das Visualisierungstool von DigiKAR versucht, diese
        komplexe Verteilung von Herrschaftsrechten anhand ausgewählter Rechte
        und Beispielregionen exemplarisch darzustellen.
      </p>
      <h3>
        Formen der Mobilität innerhalb und zwischen verschiedenen territorialen
        Räumen
      </h3>
      <p>
        Die vorliegenden Visualisierungen nähern sich der komplexen Raumstruktur
        des Alten Reiches über einen (kollektiv-)biographischen Ansatz.
        Untersucht werden hier Mobilität und multiple Zugehörigkeiten
        kurmainzischer Funktionsträger. „Mobilität“ wird dabei maßgeblich als
        „biographische Mobilität“ verstanden, die sich auf unterschiedliche
        Verortungen von Personen in verschiedenen Lebensphasen hinweg bezieht
        und etwa von Formen der alltäglichen Mobilität abzugrenzen ist. Im Fokus
        der Fallstudie stehen also v.a. ortsbezogene Aspekte biographischer
        Praktiken potenziell mobiler Akteure und was sie über räumliche
        Strukturen und Grenzvorstellungen aussagen. Gefragt wird etwa nach
        Karrieremustern und Zusammenhängen zwischen biographischen Verortungen
        und (gleich- sowie ungleichzeitigen) Zugehörigkeiten zu verschiedenen
        politischen, rechtlichen und sozialen Kreisen, ferner zu Faktoren wie
        sozialer und geographischer Herkunft und Ausbildung.
      </p>
      <div className="my-10 rounded-sm border-l-2 border-gray-200 bg-gray-50 p-10">
        <p>
          <strong>Wichtig!</strong>
          <br />
          Alle für den Prototyp verwendeten historischen Daten wurden mit großer
          Sorgfalt erhoben und verarbeitet. Die Datenerfassung diente jedoch
          nicht dazu, in jeder Hinsicht inhaltlich zuverlässige Visualisierungen
          zu produzieren. Dem explorativen Anliegen von DigiKAR entsprechend war
          das Ziel vielmehr, die Möglichkeiten einer punktbasierten Darstellung
          auszuloten. Deshalb können fehlerhafte Daten nicht ausgeschlossen
          werden; zum Teil wurde auch mit hypothetischen Daten gearbeitet. In
          der vorliegenden Form ist das Visualisierungstool deshalb nicht als
          Instrument historischer Forschung zu nutzen. Bitte kontaktieren Sie
          bei Rückfragen die Mitglieder des Forschungsteams.
        </p>
      </div>
      <p>
        Den Quellcode des Prototyps finden Sie auf{" "}
        <a href="https://github.com/ifl-geovis/DigiKAR">github</a>.
      </p>
      <h3>Allgemeine Hinweise zur Bedienung</h3>
      <p>
        Das Visualisierungstool ist in zwei große Bereiche mit mehreren
        Visualisierungen aufgeteilt, die Sie links oben auf dieser Seite unter
        „Rechte“ und „Mobilität“ erreichen:
      </p>
      <ol className="my-5 list-decimal space-y-5 pl-5">
        <li>
          Der Teil „Rechte“ präsentiert Visualisierungen zur pluralen Verteilung
          von Herrschaftsrechten im Alten Reich mithilfe einer spezifischen, im
          Rahmen von DigiKAR entwickelten grafischen Figur („Schneeflocke”). Er
          unterteilt sich in zwei Karten:
          <ul className="list-disc pl-5">
            <li>
              „Rechteverteilung im Alten Reich auf Ortsebene“: Die
              Visualisierung präsentiert die Verteilung von Herrschaftsrechten
              auf der Basis von einzelnen Orten (Gemeinden). Derzeit sind zwei
              Beispielregionen integriert: Teile von Kursachsen und der
              Altlandkreis Ansbach (Franken).
            </li>
            <li>
              „Rechteverteilung auf der Ebene der Anwesen”: Die Visualisierung
              ist lediglich ein erster Versuch, die Darstellung auf Ortsebene
              durch eine Darstellung auf Anwesenebene innerhalb eines Ortes zu
              ergänzen. Sie bedarf bis zu einer ausgereiften Lösung weiterer
              Überlegungen.
            </li>
          </ul>
        </li>
        <li>
          Der Teil „Mobilität“ präsentiert auf der Basis von historischen Daten
          zum Kurfürstentum Mainz Visualisierungen zur biographischen Mobilität
          in verschiedenen Teilaspekten:
        </li>
        <ul className="list-disc pl-5">
          <li>geographische Herkunft von Studenten der Universität Mainz,</li>
          <li>biographische Mobilität Kurmainzer Amtsträger,</li>
          <li>Studienorte von Professoren der Mainzer Universität,</li>
          <li>
            Verbindungen zwischen Geburts- und Sterbeorten von Kurmainzer
            Amtsträgern,
          </li>
          <li>
            Institutionen Kurmainzer Orten und dort ausgeübte Funktionen von
            Amtsträgern
          </li>
          <li>Verteilung von Geburts- und Todesereignissen.</li>
        </ul>
      </ol>
      <p>
        Detailliertere Anleitungen zur Nutzung der Bereiche und ihrer Karten
        finden Sie, indem Sie im Auswahlfeld die grau unterlegte Fläche
        anklicken.
      </p>
      <h3>Über DigiKar</h3>
      <p>
        DigiKAR war ein Kooperationsprojekt des Leibniz-Instituts für
        Europäische Geschichte Mainz, des Leibniz-Instituts für Länderkunde
        Leipzig, des Leibniz-Instituts für Ost- und Südosteuropaforschung
        Regensburg, der Johannes-Gutenberg-Universität Mainz und der École des
        Hautes Études en Sciences Sociales Paris, Frankreich. Das Vorhaben wurde
        2021–2024 im Rahmen des Programms „Leibniz-Kooperative Exzellenz“ von
        der Leibniz-Gemeinschaft gefördert.
      </p>
      <PartnersGrid
        partners={[
          {
            name: "Leibniz Gemeinschaft",
            image: "wgl.png",
            href: "https://www.leibniz-gemeinschaft.de/",
          },
          {
            name: "EHESS",
            image: "ehess.svg",
            href: "https://www.ehess.fr/fr",
          },
          {
            name: "Johannes Gutenberg Universität Mainz",
            image: "jgu.png",
            href: "https://www.uni-mainz.de/",
          },
          {
            name: "Leibniz Institut für Ost= und Südost-Europaforschung",
            image: "ios.svg",
            href: "https://leibniz-ios.de/",
          },
          {
            name: "Leibniz-Institut für Europäische Geschichte",
            image: "ieg.svg",
            href: "https://www.ieg-mainz.de/",
          },
          {
            name: "Leibniz Institut für Länderkunde",
            image: "ifl.svg",
            href: "https://leibniz-ifl.de/",
          },
        ]}
      />
    </article>
  );
}
