import Navigation from "../components/Navigation";

export default async function Home() {
  return (
    <>
      <Navigation />
      <main className="mt-20 max-w-screen-sm px-20">
        <h2>Internal prototype for DigiKAR</h2>
        <p>
          Explorative, point-based visualizations of space constituting
          phenomena in the Holy Roman Empire (&ldquo;Altes Reich&rdquo;).
        </p>
      </main>
    </>
  );
}
