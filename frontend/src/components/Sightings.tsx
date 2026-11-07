//returns da sightings in test data in html

import { type Sighting } from "../types/sighting";

interface SightingsProps { //prop to pass data between components
  sightings: Sighting[];
  onSightingSelect: (sighting: Sighting) => void;
}

function Sightings({ sightings, onSightingSelect }: SightingsProps) {
  return (
    <div className="sightings-container">
      <h2>Sightings table</h2>
      <p>click a row to view sighting details</p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Location</th>
            <th>Species</th>
            <th>Latin Name</th>
          </tr>
        </thead>

        <tbody>
          {
            sightings.map((sighting) => (
              <tr 
                key={sighting.id}
                onClick={() => onSightingSelect(sighting)}
                className="clickable-row"  
              >
                <td>{sighting.id}</td>
                <td>{sighting.date}</td>
                <td>{sighting.location}</td>
                <td>{sighting.species}</td>
                <td>{sighting.latinName}</td>
              </tr>
              )
            )
          }
        </tbody>
      </table>
    </div>
  );
}

export default Sightings;