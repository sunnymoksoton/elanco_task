
interface FiltersProps { //props for passing data between components
  cities: string[];
  species: string[];
  selectedCity: string;
  selectedSpecies: string;
  onCityChange: (city: string) => void; //function that runs when city is changed
  onSpeciesChange: (species: string) => void; //etc
}

function Filters({cities, species, selectedCity, selectedSpecies, onCityChange, onSpeciesChange,}: FiltersProps) 
{
  return (
    <div className="filters-container">
      <div className="filter-group">
        <label htmlFor="city-filter">City</label>

        <select
          id="city-filter"
          value={selectedCity}
          onChange={(event) => onCityChange(event.target.value)}//target is element that triggered event, value is value of target (here is city selected)
        >
          <option value="">All cities</option>
          {cities.map((city) => ( //we want to create an option for each city
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="species-filter">Tick Species</label>

        <select
          id="species-filter"
          value={selectedSpecies}
          onChange={(event) => onSpeciesChange(event.target.value)}
        >
          <option value="">All species</option>

          {species.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Filters;
