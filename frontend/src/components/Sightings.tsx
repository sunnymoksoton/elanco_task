//returns da sightings in test data in html
import { testSightings } from "../testdata";

function Sightings() 
{
    return(
    <div className="sightings-container">
      <h2>Sightings</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Location</th>
            <th>Species</th>
            <th>latinName</th>
          </tr>
        </thead>

        <tbody>
          {testSightings.map((sighting) => ( //map to loop through all sightings in testSightings, then set id is key 
            <tr key={sighting.id}> 
              <td>{sighting.id}</td>
              <td>{sighting.date}</td>
              <td>{sighting.location}</td>
              <td>{sighting.species}</td>
              <td>{sighting.latinName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
}

export default Sightings;