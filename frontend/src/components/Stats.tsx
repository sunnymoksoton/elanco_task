//gives html for statistics

import { type Sighting } from "../types/sighting";

interface StatsProps { //prop for passing info between components
  sightings: Sighting[];
}

function Stats({ sightings }: StatsProps) {
  const totalSightings = sightings.length;

  const totalCities = new Set(
    sightings.map((sighting) => sighting.location)
  ).size;

  const totalSpecies = new Set(
    sightings.map((sighting) => sighting.species)
  ).size;

  const stats = [
    {
      title: "Total Sightings",
      value: totalSightings,
    },
    {
      title: "Total Cities with Sightings",
      value: totalCities,
    },
    {
      title: "Unique Tick Species",
      value: totalSpecies,
    },
  ];

  return (
    <div className="stats">
      {stats.map((stat) => (
        <div className="stat-card" key={stat.title}>
          <h3>{stat.title}</h3>
          <p>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

export default Stats;