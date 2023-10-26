import Navigation from "./components/Navigation";

export default async function Home() {
  return (
    <>
      <Navigation />
      <main className="px-20 mt-20 max-w-screen-sm">
        <h2>Internal prototype for DigiKAR</h2>
        <p>
          Explorative, point-based symbology for visualizing place constituting
          attributes in the context of the Holy Roman Empire (&ldquo;Altes
          Reich&rdquo;).
        </p>
      </main>
    </>
  );
}
