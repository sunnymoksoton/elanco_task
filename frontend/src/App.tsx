//returns the html to display website
import { useState } from "react"; //hook
import { APIProvider } from "@vis.gl/react-google-maps";

import Sightings from "./components/Sightings";
import Stats from "./components/Stats";
import Filters from "./components/Filters";
import TickMap from "./components/TickMap";
import Sidebar from "./components/layout/Sidebar";
import SightingDetails from "./components/SightingDetails";
import Timeline from "./components/Timeline";
import Education from "./components/Education";

import { testSightings } from "./testdata";
import { getSeverity } from "./services/severity";
import { type Sighting } from "./types/sighting";
import { type Page } from "./components/layout/Sidebar";

import "./App.css";



function App() {
  const today = new Date();
  
  // Remember the currently selected filters
  const [selectedCity, setSelectedCity] = useState(""); //selected city has init value "", setSelectedCity(???) to update selectedCity
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("all");
  const [selectedSeverity, setSelectedSeverity] = useState("all")
  const [selectedSighting, setSelectedSighting] = useState<Sighting | null>(null);
  const [activePage, setActivePage] = useState<Page>("dashboard");
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
        <Sidebar
          activePage={activePage}
          onPageChange={(page) => {
            setActivePage(page);
            setSelectedSighting(null);
          }}
        />
        
        <main className="dashboard">
          {activePage === "dashboard" && (
            <>
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

            <Timeline sightings={testSightings} />

            <Sightings 
              sightings={filteredSightings} 
              onSightingSelect={setSelectedSighting}
            />
            </>
          )}
          {activePage === "learn" && <Education />}

          {activePage === "report" && (
            <h1>Report a Sighting — Coming Soon</h1>
          )}

          {activePage === "about" && (
            <h1>About TickWatch — Coming Soon</h1>
          )}
        </main>
        {activePage === "dashboard" && (
          <SightingDetails
          selectedSighting={selectedSighting}
          allSightings={testSightings}
          onClose={() => setSelectedSighting(null)}
        />
        )}
      </div>
      
    </APIProvider>
  );
}

export default App;
