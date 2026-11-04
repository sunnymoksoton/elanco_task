import {Map} from "@vis.gl/react-google-maps";

function TickMap()
{
    const uk = {lat: 51.5, long: 0};
    
    return (
        <div className = "map-container">
            <Map
                dfaultCenter={uk}
                defaultZoom={5}
                style={{width: "100%", height: "450px"}}
            />
        </div>
    );
}

export default TickMap;