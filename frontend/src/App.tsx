//returns the html to display website
import Sightings from "./components/Sightings";
import Stats from "./components/Stats";
import "./App.css";

function App()
{
  return (
    <main className="dashboard">
      <h1>UK Tick Sightings Dashboard</h1>

      <p className="dashboard-subtitle">
        Overview of tick sightings across UK cities
      </p>

      <Stats />
      <Sightings />
    </main>
  );
}

export default App;
