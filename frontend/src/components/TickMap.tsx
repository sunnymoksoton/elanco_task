import {Map} from "@vis.gl/react-google-maps";

function TickMap()
{
    const uk = {lat: 51.5, lng: 0};
    
    return (
        <div className = "map-container">
            <Map
                defaultCenter={uk}
                defaultZoom={5}
                style={{width: "100%", height: "450px"}}
            />
        </div>
    );
}

export default TickMap;