//returns the html to display website
import { useState } from "react";

import Sightings from "./components/Sightings";
import Stats from "./components/Stats";
import Filters from "./components/Filters";

import { testSightings } from "./testdata";

import "./App.css";



function App() {
  // Remember the currently selected filters
  const [selectedCity, setSelectedCity] = useState(""); //selected city has init value "", setSelectedCity(???) to update selectedCity
  const [selectedSpecies, setSelectedSpecies] = useState("");

  // Get all unique cities from the sightings
  const cities = [...new Set( //... converts a set into an array, "spreading" the set
    testSightings.map((sighting) => sighting.location)
  )];

  // Get all unique tick species
  const species = [...new Set(
    testSightings.map((sighting) => sighting.species)
  )];

  // Filter sightings using the selected filters
  const filteredSightings = testSightings.filter((sighting) => {
    const matchesCity =
      selectedCity === "" || sighting.location === selectedCity;

    const matchesSpecies =
      selectedSpecies === "" || sighting.species === selectedSpecies;

    return matchesCity && matchesSpecies; //only include sightings that match filter conditions
  });

  return (
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
        onCityChange={setSelectedCity}
        onSpeciesChange={setSelectedSpecies}
      />

      <Stats sightings={filteredSightings} />

      <Sightings sightings={filteredSightings} />
    </main>
  );
}

export default App;
