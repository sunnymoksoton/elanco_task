//returns the html to display website
import { useState } from "react"; //hook
import { APIProvider } from "@vis.gl/react-google-maps";

import Sightings from "./components/Sightings";
import Stats from "./components/Stats";
import Filters from "./components/Filters";
import TickMap from "./components/TickMap";
import Sidebar from "./components/layout/Sidebar";
import SightingDetails from "./components/SightingDetails";

import { testSightings } from "./testdata";
import { getSeverity } from "./services/severity";
import { type Sighting } from "./types/sighting";

import "./App.css";



function App() {
  const today = new Date();
  
  // Remember the currently selected filters
  const [selectedCity, setSelectedCity] = useState(""); //selected city has init value "", setSelectedCity(???) to update selectedCity
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("all");
  const [selectedSeverity, setSelectedSeverity] = useState("all")
  const [selectedSighting, setSelectedSighting] = useState<Sighting | null>(null);
  // Get all unique cities from the sightings
  const cities = [...new Set( //... converts a set into an array, "spreading" the set
    testSightings.map((sighting) => sighting.location)
  )];

  // Get all unique tick species
  const species = [...new Set(
    testSightings.map((sighting) => sighting.species)
  )];


  //really gross filter logic
  /* starts here */
  //first get sightings filtered by date range
  const dateFilteredSightings = testSightings.filter((sighting) => {
    const sightingDate = new Date(`${sighting.date}T00:00:00`);
      const daysAgo = 
        selectedDateRange === "all"
          ? NaN
          : Number(selectedDateRange);
      const cutoffDate = new Date(today);
      cutoffDate.setDate(today.getDate() - daysAgo);
      return selectedDateRange === "all" || (sightingDate >= cutoffDate);
  });

  //then get a map with city-sightingcount key-value pairs
  const cityCounts = new globalThis.Map<string, number>();
  for(const sighting of dateFilteredSightings){
      const city = sighting.location;
      const currentCount = cityCounts.get(city) ?? 0; //if undefined defaults to 0
      cityCounts.set(city, currentCount + 1);
  }

  //then filter by city, species, severity
  const filteredSightings = dateFilteredSightings.filter((sighting) => {
    const matchesCity =
      selectedCity === "" || sighting.location === selectedCity;

    const matchesSpecies =
      selectedSpecies === "" || sighting.species === selectedSpecies;

    const matchesSeverity =
      selectedSeverity === "all" || getSeverity(cityCounts.get(sighting.location) ?? 0) === selectedSeverity;

    return matchesCity && matchesSpecies && matchesSeverity; //only include sightings that match filter conditions
  });
  /* ends here */
  

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="app-layout">
        <Sidebar/>
        
        <main className="dashboard">
        <h1>UK Tick Sightings Dashboard</h1>

        <p className="dashboard-subtitle">
          Overview of tick sightings across UK cities
        </p>

        <Filters
          cities={cities}
          species={species}
          selectedCity={selectedCity}
          selectedSpecies={selectedSpecies}
          selectedDateRange={selectedDateRange}
          selectedSeverity={selectedSeverity}
          onCityChange={setSelectedCity}
          onSpeciesChange={setSelectedSpecies}
          onDateRangeChange={setSelectedDateRange}
          onSeverityChange={setSelectedSeverity}
        />

        <TickMap sightings={filteredSightings} />

        <Stats sightings={filteredSightings} />

        <Sightings 
          sightings={filteredSightings} 
          onSightingSelect={setSelectedSighting}
        />
        </main>
        <SightingDetails
          selectedSighting={selectedSighting}
          allSightings={testSightings}
          onClose={() => setSelectedSighting(null)}
        />
      </div>
      
    </APIProvider>
  );
}

export default App;
