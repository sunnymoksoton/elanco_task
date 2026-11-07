import { type Sighting } from "../types/sighting";
import { tickSpecies, tickSpeciesAliases } from "../data/tickSpecies";

interface SightingDetailsProps
{
    selectedSighting: Sighting | null;
    allSightings: Sighting[];
    onClose: () => void;
}

function SightingDetails({selectedSighting, allSightings, onClose}: SightingDetailsProps)
{
    if (!selectedSighting)
    {
        return (
            <aside className="sighting-details">
                <div className="details-header">
                <h2>Sighting Details</h2>
                </div>

                <div className="details-empty">
                <p>Select a sighting from the table to view its details.</p>
                </div>
            </aside>
        );
    }

    const originalSpeciesName =
        selectedSighting.latinName.trim().toLowerCase();
    
    const speciesKey =
        tickSpeciesAliases[originalSpeciesName] ?? originalSpeciesName;

    const speciesInfo = tickSpecies[speciesKey];

    const hasUnverifiedSpeciesAlias =
        originalSpeciesName === "dermacentor frontalis";

    const otherCitySightings = allSightings.filter((sighting) => 
        sighting.location === selectedSighting.location && sighting.id !== selectedSighting.id);

    return (
        <aside className="sighting-details">
            <div className="details-header">
                <h2>Sighting Details</h2>

                <button
                className="details-close"
                onClick={onClose}
                aria-label="Close sighting details"
                >
                ×
                </button>
            </div>

            <div className="details-content">
                <p className="details-label">SIGHTING ID</p>
                <p className="details-value">{selectedSighting.id}</p>

                <p className="details-label">DATE REPORTED</p>
                <p className="details-value">{selectedSighting.date}</p>

                <p className="details-label">LOCATION</p>
                <p className="details-value">{selectedSighting.location}</p>

                <p className="details-label">TICK SPECIES</p>
                <p className="details-value">{selectedSighting.species}</p>

                <p className="details-label">LATIN NAME</p>
                <p className="details-value">
                <em>{selectedSighting.latinName}</em>
                </p>
                {hasUnverifiedSpeciesAlias && (
                    <p className="species-warning">
                        Warning: the API reports this as Dermacentor
                        frontalis, but the passerine tick is recognised as Ixodes
                        frontalis. This identification has not been confirmed.
                    </p>
                )}
                {speciesInfo && ( //only show info if available for that species
                
                    <div className="species-info">
                        <h3>About this species</h3>

                        <p className="species-common-name">
                        {speciesInfo.commonName}
                        </p>

                        <p>{speciesInfo.description}</p>

                        <h4>Typical habitat</h4>
                        <p>{speciesInfo.habitat}</p>

                        <h4>Identification</h4>
                        <p>{speciesInfo.identification}</p>

                        <h4>Hosts</h4>
                        <p>{speciesInfo.hosts}</p>

                        <h4>Public health</h4>
                        <p>{speciesInfo.publicHealth}</p>
                    </div>
                )}

                <div className="details-related">
                <h3>Other sightings in {selectedSighting.location}</h3>
                <p>
                    {otherCitySightings.length} other{" "}
                    {otherCitySightings.length === 1 ? "sighting" : "sightings"}{" "}
                    in the current dataset.
                </p>
                </div>
            </div>
        </aside>
    );
}

export default SightingDetails;