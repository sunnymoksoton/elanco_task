//gives html for statistics

import { testSightings } from "../testdata";

function Stats()
{
    const totalSightings = testSightings.length;

    const totalCities = new Set( //set since need unique
        testSightings.map((sighting) => sighting.location)
    ).size; //set uses size

    const totalSpecies = new Set(
        testSightings.map((sighting) => sighting.species)
    ).size;

    const stats = [
        {
            title: "Total Sightings",
            value: totalSightings
        },
        {
            title: "Total Cities with Sightings",
            value: totalCities
        },
        {
            title: "Species Categories",
            value: totalSpecies
        }
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