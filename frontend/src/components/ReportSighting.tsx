
import { useState, type FormEvent } from "react";
import { supabase } from "../lib/supabaseClient";
import { tickSpecies } from "../data/tickSpecies";

function getTodayString() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function ReportSighting() {
  const [sightingDate, setSightingDate] = useState(getTodayString());
  const [sightingTime, setSightingTime] = useState("");
  const [location, setLocation] = useState("");
  const [species, setSpecies] = useState("unknown");
  const [tickCount, setTickCount] = useState("1");
  const [notes, setNotes] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setWarningMessage("");
    setSuccessMessage("");

    // Check required fields
    if (!sightingDate || !location.trim()) {
      setErrorMessage("Please enter both a sighting date and location.");
      return;
    }

    // Check the date
    if (sightingDate > getTodayString()) {
      setWarningMessage(
        "The sighting date is in the future. Please check it before submitting."
      );
      return;
    }

    // Check the tick count
    const count = Number(tickCount);

    if (!Number.isInteger(count) || count < 1) {
      setErrorMessage("Tick count must be a whole number greater than zero.");
      return;
    }

    if (count > 10000) {
      setErrorMessage("Please check the tick count. The maximum is 10,000.");
      return;
    }

    if (notes.length > 500) {
      setErrorMessage("Notes must be 500 characters or fewer.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("sightings")
        .insert({
          sighting_date: sightingDate,
          sighting_time: sightingTime || null,
          location: location.trim(),
          species,
          tick_count: count,
          notes: notes.trim() || null,
        });

      if (error) {
        throw error;
      }

      setSuccessMessage(
        "Your sighting has been submitted successfully and is awaiting review. Thank you for contributing to TickWatch!"
      );

      // Reset the form after a successful submission
      setSightingDate(getTodayString());
      setSightingTime("");
      setLocation("");
      setSpecies("unknown");
      setTickCount("1");
      setNotes("");
    } catch (error) {
      console.error("Error submitting sighting:", error);
      setErrorMessage(
        "We couldn't submit your sighting. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="report-page">
      <header className="report-header">
        <h1>Report a Tick Sighting</h1>
        <p>
          Help us understand tick sightings across the UK by
          submitting a report.
        </p>
      </header>

      <form className="report-form" onSubmit={handleSubmit}>
        <div className="report-field">
          <label htmlFor="sighting-date">Date of sighting *</label>
          <input
            id="sighting-date"
            type="date"
            value={sightingDate}
            max={getTodayString()}
            onChange={(event) => setSightingDate(event.target.value)}
            required
          />
        </div>

        <div className="report-field">
          <label htmlFor="sighting-time">Approximate time</label>
          <input
            id="sighting-time"
            type="time"
            value={sightingTime}
            onChange={(event) => setSightingTime(event.target.value)}
          />
        </div>

        <div className="report-field">
          <label htmlFor="sighting-location">Town or city *</label>
          <input
            id="sighting-location"
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="e.g. Southampton"
            maxLength={100}
            required
          />
          <small>Please provide an approximate location, not a home address.</small>
        </div>

        <div className="report-field">
          <label htmlFor="sighting-species">Tick species</label>
          <select
            id="sighting-species"
            value={species}
            onChange={(event) => setSpecies(event.target.value)}
          >
            <option value="unknown">I don't know</option>
            {Object.values(tickSpecies).map((tick) => (
              <option key={tick.latinName} value={tick.latinName}>
                {tick.commonName} ({tick.latinName})
              </option>
            ))}
          </select>
        </div>

        <div className="report-field">
          <label htmlFor="tick-count">Number of ticks</label>
          <input
            id="tick-count"
            type="number"
            min="1"
            max="10000"
            step="1"
            value={tickCount}
            onChange={(event) => setTickCount(event.target.value)}
            required
          />
        </div>

        <div className="report-field">
          <label htmlFor="sighting-notes">Additional notes</label>
          <textarea
            id="sighting-notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Describe where the tick was spotted or any other useful details..."
            maxLength={500}
            rows={4}
          />
          <small>{notes.length}/500 characters</small>
        </div>

        {errorMessage && (
          <div className="report-message report-error" role="alert">
            <strong>Error:</strong> {errorMessage}
          </div>
        )}

        {warningMessage && (
          <div className="report-message report-warning" role="alert">
            <strong>Warning:</strong> {warningMessage}
          </div>
        )}

        {successMessage && (
          <div className="report-message report-success" role="status">
            <strong>Success:</strong> {successMessage}
          </div>
        )}

        <button
          className="report-submit"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Sighting"}
        </button>

        <p className="report-required-note">* Required fields</p>
      </form>
    </div>
  );
}

export default ReportSighting;
