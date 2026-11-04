import {Map, AdvancedMarker, Pin} from "@vis.gl/react-google-maps";
import { type Sighting } from "../types/sighting";

interface TickMapProps
{
    sightings: Sighting[];
}



function TickMap({sightings}: TickMapProps)
{
    const cityCoords: Record<string, {lat: number, lng: number}> =
    {
        Southampton: {lat: 50.9, lng: -1.4},
        London: {lat: 51.5, lng: -0.1}
    };

    const cities = [...new Set(sightings.map((sighting) => sighting.location))];

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
                cities.map((city) => {
                    const position = cityCoords[city];
                    const count = sightings.filter((sighting) => sighting.location === city).length;
                    return (
                        <AdvancedMarker
                            key={city}
                            position={position}
                            title={`${city}: ${count} sightings`}
                        >
                            <Pin glyph={String(count)}/>
                        </AdvancedMarker>
                    );
                })
            }
            </Map>
        </div>
    );
}

export default TickMap;