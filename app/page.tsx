export default async function Home() {
  return (
    <article className="mx-auto my-5 max-w-prose px-4 md:px-0 [&_>_p]:mb-3">
      <h2>Interner Prototyp DigiKAR</h2>
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
        digitalen Kartographie die Möglichkeiten einer punktbasierten
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
          der vorliegenden Form ist das Visualisierungstool deshalb kein
          Instrument historischer Forschung.
        </p>
      </div>
      <p>
        Denn Quellcode des Prototyps finden Sie auf{" "}
        <a href="https://github.com/ifl-geovis/DigiKAR">github</a>.
      </p>
      <div>
        <h2>Inhalt</h2>
        <ol>
          <li>
            <a href="#glossary">Glossar</a>
            <ol className="list-decimal">
              <li>
                <a href="#herrschaftsrechte">Herrschaftsrechte</a>
              </li>
              <li>
                <a href="#mobility">Mobilität</a>
              </li>
            </ol>
          </li>
          <li>
            <a href="">Bedienung</a>
          </li>
        </ol>
      </div>
      <h2 id="glossary">Glossar</h2>
      <p>Das nachfolgende Glossar erläutert die wichtigsten Begriffe.</p>
      <h3 id="herrschaftsrechte">Herrschaftsrechte</h3>
      <h4>Grundherrschaft</h4>
      <p>
        Das Alte Reich war, wie andere frühneuzeitliche Herrschaftsräume auch,
        durch eine Vielzahl verteilter und geteilter Herrschaftsrechte
        gekennzeichnet. Es war weder ein Nationalstaat noch eine zentralistisch
        organisierte Monarchie, in der alle Rechte und Privilegien
        pyramidenförmig auf ein souveränes Machtzentrum zuliefen. Diese komplexe
        Ordnung ließ sich mit den herkömmlichen Mitteln der
        Geschichtskartographie, die sich vor allem grafischer Mittel wie Flächen
        und Linien bediente, nur schwer darstellen. Denn viele Herrschaftsrechte
        reichten über die Grenzen der einzelnen Territorien der Reichsstände
        hinaus. Ein Untertan konnte im Alten Reich viele Herren haben - und ein
        Herr Untertanen auch in Gebieten, in denen eigentlich ein anderer
        Potentat herrschte. Das lag am Mit- und Nebeneinander vieler
        Herrschaftsrechte, die zwar nicht alle das gleiche Gewicht hatten, von
        denen aber keines alle anderen beherrschte oder umfasste. Das galt auch
        für die „Landesherrschaft“ oder „Landeshoheit“, wie die Juristen seit
        dem 16. Jahrhundert das Recht eines Fürsten (oder eines anderen
        Territorialherrn) nannten, alle Menschen, die in dem ihm reichsrechtlich
        als Eigentum zugeordneten Gebiet lebten, als seine Untertanen zu
        betrachten. Denn auch dieses Recht, das in der Regel mit der
        Reichsstandschaft (d.h. mit Sitz und Stimme auf dem Reichstag, dem
        kollektiven Entscheidungsorgan des Alten Reiches aus Kaiser und
        Reichsständen) verbunden war, schloss nicht aus, dass andere
        Herrschaftsrechte, z.B. die Gerichtsbarkeit, von einem anderen
        Herrschaftsträger ausgeübt wurden.
      </p>
      <p>
        Das Visualisierungstool von DigiKAR versucht, diese komplexe Verteilung
        von Herrschaftsrechten anhand ausgewählter Rechte exemplarisch
        darzustellen. Neben den im Folgenden erläuterten Rechten existierten
        noch zahlreiche weitere, die hier noch nicht berücksichtigt wurden. Ihre
        nachträgliche Integration ist jedoch aufgrund der prinzipiell offenen
        Konzeption des Visualisierungstools möglich.
      </p>
      <p>
        <strong>Wichtig!</strong> Die folgenden Definitionen verstehen sich als
        allgemeine Beschreibungen, welche die im Visualisierungstool
        integrierten Herrschaftsrechte auch Nicht-Historikerinnen und
        -historiker verständlich machen wollen. Da der konkrete Inhalt der
        jeweiligen Rechte jedoch von Region zu Region variieren konnte, können
        sie eine genauere Beschäftigung mit ihnen nicht ersetzen.
      </p>
      <h4>Grundherrschaft</h4>
      <p>
        Grundherrschaft bezeichnet die unmittelbaren Herrschaftsrechte, die sich
        auf die Besitzverhältnisse im ländlichen Raum bezogen. In den Städten
        gab es in der Regel keine Grundherrschaft. Als abstrakter Sammelbegriff
        beschreibt sie die vielfältigen persönlichen Abhängigkeiten, die mit der
        Herrschaft über die auf dem Grund und Boden eines Grundherrn lebenden
        Menschen verbunden waren. Diese hatten das Land meist vom Grundherrn
        geliehen oder gepachtet und bewirtschafteten es, wofür sie Abgaben und
        Dienste zu leisten hatten. Darüber hinaus war die Grundherrschaft mit
        der Ausübung zahlreicher Verwaltungs- und Gerichtsfunktionen verbunden.
        Grundherren konnten Landesherren sein, aber auch adelige Grundbesitzer,
        Städte sowie zahlreiche Korporationen (z.B. geistliche Institutionen wie
        Klöster oder Stifte, aber auch Universitäten oder Schulen usw.).
      </p>
      <h4>Hochgericht</h4>
      <p>
        Die Hochgerichtsbarkeit beschreibt das Recht eines Herrschaftsträgers,
        schwere Straftaten wie Mord, Raub, Brandstiftung oder Notzucht
        (Vergewaltigung) gerichtlich zu verfolgen und die Delinquenten zu
        bestrafen. Sie wird auch als Blutgerichtsbarkeit bezeichnet, weil sie
        mit dem Recht verbunden war, schwere Sanktionen wie Körper-,
        Verstümmelungs- oder Todesstrafen zu verhängen und zu vollstrecken.
        Lange Zeit galt sie als das vornehmste Herrschaftsrecht, weshalb sie in
        einem engen Zusammenhang mit der Landesherrschaft bzw. -hoheit steht.
        Inhaber der Hochgerichtsbarkeit mussten aber nicht unbedingt Landesherrn
        sein. Anzeiger der Hochgerichtsbarkeit war das Vorhandensein von
        Richtstätten (Galgen usw.), die eine wichtige Rolle bei der Abgrenzung
        territorialer Herrschaftsgebiete spielten.
      </p>
      <h4>Jagd</h4>
      <p>
        Mit dem Jagdrecht (auch „Wildbann“) ist das alleinige Recht eines
        Herrschaftsträgers gemeint, in einem bestimmten Gebiet Wild zu jagen.
        Seit dem Spätmittelalter stand es fast ausschließlich dem Adel zu, wobei
        die „hohe Jagd“ auf Rot- und Schwarzwild als ein landesherrliches
        Privileg galt, während niederadligen Grundherren meist nur die „niedere
        Jagd“ auf Füchse, Hasen oder Geflügel zukam. Den Untertanen in den
        Dörfern war in der Regel jegliche Form der Jagd streng untersagt, sie
        mussten dem jeweiligen Inhaber des Jagdrechts aber zahlreiche
        Hilfsdienste leisten.
      </p>
      <h4>Kirchenpatronat</h4>
      <p>
        Das Kirchenpatronat bezeichnet die Schirmherrschaft, die ein
        Herrschaftsträger über eine bestimmte Kirche ausübte. In
        protestantischen Gebieten kam sie in der Regel dem Landesherrn bzw. dem
        Landeskonsistorium zu. Verbunden mit ihm war zum Beispiel die
        Verpflichtung zur baulichen Erhaltung der Kirchengebäude; im Gegenzug
        kamen dem Kirchenpatron bestimmte Privilegien zu, etwa ein besonderer
        Platz in der Kirche oder das Recht, sich dort bestatten zu lassen.
        Teilweise war das Kirchenpatronat mit dem Präsentationsrecht verbunden,
        also dem Vorrecht, bei einer Vakanz einen neuen Pfarrer vorzuschlagen.{" "}
      </p>
      <h4>Landeshoheit</h4>
      <p>
        Mit dem Begriff Landeshoheit wurde seit dem 16. Jahrhundert das
        abstrakte Recht eines Landesherrn bezeichnet, die Oberhoheit über das
        von ihm beherrschte Land mitsamt aller seiner Einwohner zu beanspruchen.
        Was genau dieses Recht meinte und aus welchen anderen Herrschaftsrechten
        es sich gegebenenfalls ableiten ließ, war unter zeitgenössischen
        Juristen umstritten; eine allgemein verbindliche Definition der
        Landeshoheit gab es nicht. Das führte zu zahlreichen regional
        spezifischen Ausprägungen dieses Rechts und zu häufigen
        Auseinandersetzungen, wenn es von mehreren Herrschaftsträgern
        beansprucht wurde. In manchen Fällen ist es deshalb außerordentlich
        schwierig, den Inhaber der Landeshoheit eindeutig zu identifizieren,
        weil die Angaben in den Quellen nur der Selbstwahrnehmung des jeweiligen
        Herrschaftsträgers entsprechen, der sie für sich reklamierte. Auch war
        die Landeshoheit kein „höheres“ Herrschaftsrecht, welches alle anderen
        gewissermaßen überwölbte. Anders als in vielen herkömmlichen
        Geschichtskarten zum Alten Reich wird sie deshalb im Visualisierungstool
        nur als ein Herrschaftsrecht neben anderen behandelt.
      </p>
      <h4>Niedergericht</h4>
      <p>
        Die Niedergerichtbarkeit umfasste in der Regel unbedeutendere Delikte,
        zum Beispiel Grenzstreitigkeiten, Wald- und Flurdiebstahl,
        Wirtshausraufereien ohne ernsthafte Verletzungen oder Beleidigungen. Die
        Inhaber des Niedergerichts konnten nur leichte Strafen verhängen, etwa
        Geldbußen, kurze Haftstrafen oder Ehrenstrafen wie das
        An-den-Pranger-Stellen. Die Anwendung der Folter bei der richterlichen
        Untersuchung sowie die Verhängung und Vollstreckung von Todesstrafen
        waren ihnen untersagt. Oft, aber nicht immer, war die niedere
        Gerichtsbarkeit mit der Grundherrschaft verbunden.
      </p>
      <h4>Verwaltungszugehörigkeit</h4>
      <p>
        Die Verwaltungszugehörigkeit meint die Zugehörigkeit eines bestimmten
        Ortes zu einer größeren Verwaltungseinheit, zum Beispiel einem Amt oder
        einem Kreis innerhalb einer Landesverwaltung. Sie bedeutet jedoch nicht,
        dass der landesherrlichen Verwaltung hier auch zwingend bestimmte
        Herrschaftsrechte (von der Landeshoheit abgesehen). Allerdings kam es
        vielfach vor, dass Dörfer direkt der Landesverwaltung unterstanden, weil
        der Landesherr hier auch Grundherr war. Weil die Grundherrschaft in
        diesem Fall von lokalen Verwaltungseinheiten wie den Ämtern ausgeübt
        wurde, spricht man auch von „Amtsdörfern“.
      </p>
      <hr className="mt-5" />
      <h3 id="mobility">Mobilität</h3>
      <p>
        <em>wird noch ergänzt</em>
      </p>
    </article>
  );
}
