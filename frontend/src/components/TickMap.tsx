import {Map, AdvancedMarker, Pin, InfoWindow} from "@vis.gl/react-google-maps";
import { type Sighting } from "../types/sighting";
import { useState } from "react"; //hook

interface TickMapProps
{
    sightings: Sighting[];
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
                    if (!position) return null;
                    const count = sightings.filter((sighting) => sighting.location === city).length;

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
                        >
                            <Pin 
                                glyph={String(count)}
                                background = {markerColour}
                                borderColor = {markerColour}
                                glyphColor = "white"
                            />
                        </AdvancedMarker>
                    );
                })
            }
            </Map>
        </div>
    );
}

export default TickMap;