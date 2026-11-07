//This is fully vibecoded lol

import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { Sighting } from "../types/sighting";

interface TimelineProps {
  sightings: Sighting[];
}

function Timeline({ sightings }: TimelineProps) {
  // Get the unique cities represented in the sightings
  const cities = useMemo(
    () => [...new Set(sightings.map((sighting) => sighting.location))].sort(),
    [sightings]
  );

  // The first available city is selected by default.
  const [selectedCity, setSelectedCity] = useState("");

  const activeCity = cities.includes(selectedCity)
    ? selectedCity
    : cities[0] ?? "";

  // Count sightings per month for the selected city.
  const monthlyData = useMemo(() => {
    const monthlyCounts: Record<string, number> = {};

    sightings
        .filter((sighting) => sighting.location === activeCity)
        .forEach((sighting) => {
        const date = new Date(sighting.date);

        if (Number.isNaN(date.getTime())) return;

        const monthKey = `${date.getFullYear()}-${String(
            date.getMonth() + 1
        ).padStart(2, "0")}`;

        monthlyCounts[monthKey] = (monthlyCounts[monthKey] ?? 0) + 1;
        });

    // Find the first and last months with recorded sightings.
    const recordedMonths = Object.keys(monthlyCounts).sort();

    if (recordedMonths.length === 0) return [];

    const [firstYear, firstMonth] = recordedMonths[0].split("-").map(Number);
    const [lastYear, lastMonth] = recordedMonths[
        recordedMonths.length - 1
    ].split("-").map(Number);

    // Build a continuous timeline, including months with zero sightings.
    const completeTimeline = [];
    const currentDate = new Date(firstYear, firstMonth - 1, 1);
    const endDate = new Date(lastYear, lastMonth - 1, 1);

    while (currentDate <= endDate) {
        const monthKey = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
        ).padStart(2, "0")}`;

        const label = currentDate.toLocaleDateString("en-GB", {
        month: "short",
        year: "numeric",
        });

        completeTimeline.push({
        month: label,
        count: monthlyCounts[monthKey] ?? 0,
        });

        currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return completeTimeline;
}, [sightings, activeCity]);

  const totalSightings = monthlyData.reduce(
    (total, item) => total + item.count,
    0
  );

  const busiestMonth =
    monthlyData.length > 0
      ? monthlyData.reduce((busiest, item) =>
          item.count > busiest.count ? item : busiest
        )
      : null;

  if (cities.length === 0) {
    return <p>No sighting data is available for the timeline.</p>;
  }

  return (
    <section className="timeline-container">
      <div className="timeline-header">
        <div>
          <h2>Timeline view</h2>
          <p>Monthly reported sightings for the selected area.</p>
        </div>

        <div className="timeline-city-filter">
          <label htmlFor="timeline-city">Select city</label>
          <select
            id="timeline-city"
            value={activeCity}
            onChange={(event) => setSelectedCity(event.target.value)}
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="timeline-stats">
        <div>
          <span>Total sightings</span>
          <strong>{totalSightings}</strong>
        </div>

        <div>
          <span>Busiest month</span>
          <strong>{busiestMonth?.month ?? "No data"}</strong>
        </div>
      </div>

      {monthlyData.length === 0 ? (
        <p>No valid dated sightings are available for this city.</p>
      ) : (
        <div className="timeline-chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyData}
              margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip
                formatter={(value) => [value, "Sightings"]}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#244B68"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}

export default Timeline;
