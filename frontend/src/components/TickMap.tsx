import {Map, AdvancedMarker, Pin, InfoWindow} from "@vis.gl/react-google-maps";
import { type Sighting } from "../types/sighting";
import { useState } from "react"; //hook

interface TickMapProps
{
    sightings: Sighting[];
}



function getCities(sightings: Sighting[]){
    return [...new Set(sightings.map((sighting) => sighting.location))];
}



function getSightingsInCity(sightings: Sighting[], city: string|null){
    return sightings.filter((sighting) => sighting.location === city);
}



function getSpeciesSightingsPairs(sightings: Sighting[], ){
    const pairs = new globalThis.Map<string, number>();
    for(const sighting of sightings){
        const species = sighting.species;
        const currentCount = pairs.get(species) ?? 0; //if undefined defaults to 0
        pairs.set(species, currentCount + 1);
    }
    return pairs;
}



function TickMap({sightings}: TickMapProps)
{
    //store clicked city marker
    const [selectedCity, setSelectedCity] = useState<string|null>(null);
    const cityCoords: Record<string, {lat: number, lng: number}> =
    {
        Southampton: {lat: 50.9, lng: -1.4},
        London: {lat: 51.5, lng: -0.1}
    };

    const cities = getCities(sightings);
    const selectedCitySightings = getSightingsInCity(sightings, selectedCity)
    
    const uk = {lat: 55, lng: -2};
    return (
        <div className = "map-container">
            <Map
                mapId="DEMO_MAP_ID"
                defaultCenter={uk}
                defaultZoom={5}
                style={{width: "100%", height: "450px"}}
            >
            {
                cities.map((city) => 
                    {
                        const position = cityCoords[city];
                        if (!position) return null; //if city has no coordinates skip it
                        const count = getSightingsInCity(sightings, city).length;

                        let markerColour = "green";
                        if (count >10) 
                        {
                            markerColour = "red";
                        }
                        else if (count > 4)
                        {
                            markerColour = "orange";
                        }

                        return (
                            <AdvancedMarker
                                key={city}
                                position={position}
                                title={`${city}: ${count} sightings`}
                                onClick={()=>setSelectedCity(city)}
                            >
                                <Pin 
                                    glyph={String(count)}
                                    background = {markerColour}
                                    borderColor = {markerColour}
                                    glyphColor = "white"
                                />
                            </AdvancedMarker>
                        );
                    }
                )
            }
            {
                (selectedCity != null) && (
                    <InfoWindow
                        position={cityCoords[selectedCity]}
                        onCloseClick={()=>setSelectedCity(null)}
                    >
                        <div>
                            <h3>{selectedCity}</h3>
                            <p>
                                Total sightings: {selectedCitySightings.length}
                            </p>
                            <h4>Sightings by species</h4>

                            {
                                Array.from(getSpeciesSightingsPairs(selectedCitySightings)).map(([species, count]) => (
                                        <p key={species}>
                                            {species}: {count} sightings
                                        </p>
                                    )
                                )
                            }
                        </div>
                    </InfoWindow>
                )
            }
            </Map>
        </div>
    );
}

export default TickMap;