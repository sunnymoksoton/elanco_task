
import { useState } from "react";
import { tickSpecies } from "../data/tickSpecies";

type EducationTab = "species" | "prevention";

function Education() {
  const [activeTab, setActiveTab] = useState<EducationTab>("species");
  const [searchTerm, setSearchTerm] = useState("");

  const speciesList = Object.values(tickSpecies);

  const filteredSpecies = speciesList.filter((species) => {
    const search = searchTerm.toLowerCase();

    return (
      species.commonName.toLowerCase().includes(search) ||
      species.latinName.toLowerCase().includes(search)
    );
  });

  return (
    <div className="education-page">
      <header className="education-header">
        <h1>Tick Education Centre</h1>
        <p>
          Learn about tick species found in the UK and how to reduce
          your risk of tick bites.
        </p>
      </header>

      <div className="education-tabs">
        <button
          className={activeTab === "species" ? "active" : ""}
          onClick={() => setActiveTab("species")}
        >
          Species Identification Guide
        </button>

        <button
          className={activeTab === "prevention" ? "active" : ""}
          onClick={() => setActiveTab("prevention")}
        >
          Prevention Tips
        </button>
      </div>

      {activeTab === "species" && (
        <section className="education-section">
          <div className="education-section-heading">
            <h2>UK Tick Species</h2>
            <p>
              Explore the species in the TickWatch database and learn
              about their characteristics and habitats.
            </p>
          </div>

          <input
            className="species-search"
            type="text"
            placeholder="Search by common or scientific name..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <div className="species-grid">
            {filteredSpecies.map((species) => {
              const needsVerification =
                species.latinName.toLowerCase() === "dermacentor frontalis";

              return (
                <article
                  className="species-card"
                  key={species.latinName}
                >
                  <div className="species-card-header">
                    <h3>{species.commonName}</h3>
                    {needsVerification && (
                      <span className="species-verification">
                        Identification needs checking
                      </span>
                    )}
                    <span className="species-latin">
                      {species.latinName}
                    </span>
                  </div>

                  <div className="species-card-content">
                    <div>
                      <h4>Overview</h4>
                      <p>{species.description}</p>
                    </div>

                    <div>
                      <h4>Habitat</h4>
                      <p>{species.habitat}</p>
                    </div>

                    <div>
                      <h4>Identification</h4>
                      <p>{species.identification}</p>
                    </div>

                    <div>
                      <h4>Hosts</h4>
                      <p>{species.hosts}</p>
                    </div>

                    <div>
                      <h4>Public health</h4>
                      <p>{species.publicHealth}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {filteredSpecies.length === 0 && (
            <p className="education-empty">
              No species matched your search.
            </p>
          )}

          <p className="education-note">
            Species information is provided for general education.
            Tick identification from a sighting record may not be
            confirmed.
          </p>
        </section>
      )}

      {activeTab === "prevention" && (
        <section className="education-section">
          <div className="education-section-heading">
            <h2>How to Protect Yourself from Ticks</h2>
            <p>
              Simple precautions can help reduce the chance of being
              bitten when spending time outdoors.
            </p>
          </div>

          <div className="prevention-grid">
            <article className="prevention-card">
              <h3>1. Dress appropriately</h3>
              <ul>
                <li>Wear long-sleeved tops and long trousers.</li>
                <li>Choose light-coloured clothing so ticks are easier to spot.</li>
                <li>Consider tucking trousers into socks.</li>
              </ul>
            </article>

            <article className="prevention-card">
              <h3>2. Take care outdoors</h3>
              <ul>
                <li>Stay on clearly defined paths where possible.</li>
                <li>Avoid brushing against long grass and dense vegetation.</li>
                <li>Use an appropriate insect repellent, following its instructions.</li>
              </ul>
            </article>

            <article className="prevention-card">
              <h3>3. Check for ticks</h3>
              <ul>
                <li>Check your clothing and skin during outdoor activities.</li>
                <li>Carry out a thorough tick check when you return home.</li>
                <li>Pay attention to skin folds, armpits, groin, behind knees and hairline.</li>
                <li>Remember to check children and pets too.</li>
              </ul>
            </article>

            <article className="prevention-card">
              <h3>4. Remove ticks safely</h3>
              <ul>
                <li>Use fine-tipped tweezers or a tick removal tool.</li>
                <li>Grip the tick as close to the skin as possible.</li>
                <li>Pull upwards slowly and firmly without squeezing the tick.</li>
                <li>Clean the bite area afterwards.</li>
              </ul>
            </article>
          </div>

          <div className="prevention-warning">
            <h3>When to seek medical advice</h3>
            <p>
              If you develop a spreading circular rash or flu-like
              symptoms after a tick bite, contact your GP promptly
              or NHS 111. Tell them about the tick bite or recent
              outdoor exposure.
            </p>
          </div>

          <p className="education-note">
            This guide is for general awareness and does not replace
            professional medical advice.
          </p>
        </section>
      )}
    </div>
  );
}

export default Education;