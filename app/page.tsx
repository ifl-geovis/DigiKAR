export default async function Home() {
  return (
    <article className="mx-auto my-5 max-w-prose">
      <h2>Interner Prototyp DigiKAR</h2>
      <p className="mb-4 text-xl">
        Explorative, punktbasierte Visualisierungen für das
        Heilige&nbsp;Römische&nbsp;Reich&nbsp;deutscher&nbsp;Nation
        (&ldquo;Altes&nbsp;Reich&rdquo;). Über die Konstituierung von Räumen
        durch Mobilität und plurale Verteilung von Herrschaftsrechten.
      </p>
      <p>
        Dieser Prototyp dient der internen Evaluation von
        Visualisierungsansätzen und der Entwicklung von explorativen
        Visualisierungen für Historiker·innen. Er ist nicht für die
        Allgemeinheit bestimmt, befindet sich in Entwicklung und kann daher Bugs
        enthalten.
      </p>
      <p>
        Denn Quellcode finden Sie auf{" "}
        <a href="https://github.com/ifl-geovis/DigiKAR">github</a>.
      </p>
      <div>
        <h2>Inhalt</h2>
        <ol>
          <li>
            <a href="#glossary">Glossar</a>
            <ol>
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
      <h4>Hochgericht</h4>
      <h4>Niedergericht</h4>
      <h4>Grundherrschaft</h4>
      <h4>Landeshoheit</h4>
      <h4>Verwaltungzugehörigkeit</h4>
      <h4>Kirchenpatronat</h4>
      <h4>Jagd</h4>
      <h3 id="mobility">Mobilität</h3>
    </article>
  );
}
