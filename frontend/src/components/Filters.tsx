
interface FiltersProps { //App will first filter data based on filters before using it to display stats and map
  cities: string[];
  species: string[];
  selectedCity: string;
  selectedSpecies: string;
  selectedDateRange: string;
  selectedSeverity: string;
  onCityChange: (city: string) => void; //function that updates selected city
  onSpeciesChange: (species: string) => void; //etc
  onDateRangeChange: (dateRange: string) => void;
  onSeverityChange: (severity: string) => void;
}

function Filters({cities, species, selectedCity, selectedSpecies, selectedDateRange, selectedSeverity, onCityChange, onSpeciesChange, onDateRangeChange, onSeverityChange}: FiltersProps) 
{
  return (
    <div className="filters-container">
      <div className="filter-group">
        <label htmlFor="city-filter">City</label>

        <select
          id="city-filter"
          value={selectedCity}
          onChange=
          {
            (event) => onCityChange(event.target.value)
          }//target is element that triggered event, value is value of target (here is city selected)
        >
          <option value="">All cities</option>
          {
            cities.map((city) => ( //we want to create an option for each city
              <option key={city} value={city}>
                {city}
              </option>
              )
            )
          }
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

          {
            species.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
              )
            )
          }
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="date-filter">Date range</label>
        <select
          id="date-filter"
          value={selectedDateRange}
          onChange={(event) => onDateRangeChange(event.target.value)}
        >
          <option value="all">All time</option>
          <option value="14">Last 14 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>

        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="severity-filter">Severity</label>
        <select
          id="severity-filter"
          value={selectedSeverity}
          onChange={(event) => onSeverityChange(event.target.value)}
        >
          <option value="all">All severity</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>

        </select>
      </div>
    </div>
  );
}

export default Filters;
