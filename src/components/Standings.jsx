import { useState } from "react";
import { Link } from "react-router-dom";

const mockEast = [
  { rank: 1, team: "BOS", teamId: 1610612738, w: 58, l: 24, pct: ".707", gb: "—" },
  { rank: 2, team: "MIL", teamId: 1610612749, w: 55, l: 27, pct: ".671", gb: "3" },
  { rank: 3, team: "PHI", teamId: 1610612755, w: 52, l: 30, pct: ".634", gb: "6" },
  // ...add more rows or replace with real data
];

const mockWest = [
  { rank: 1, team: "GSW", teamId: 1610612744, w: 60, l: 22, pct: ".732", gb: "—" },
  { rank: 2, team: "DEN", teamId: 1610612743, w: 56, l: 26, pct: ".683", gb: "4" },
  { rank: 3, team: "PHX", teamId: 1610612756, w: 53, l: 29, pct: ".646", gb: "7" },
  // ...add more rows or replace with real data
];

export default function Standings({ east = mockEast, west = mockWest }) {
  const [conference, setConference] = useState("east") // "east" | "west"
  const rows = conference === "east" ? east : west

  return (
    <section className="standings">
      <div className="conference_buttons">
        <button
          type="button" className="conference_button"
          onClick={() => setConference("east")}
          style={{
            border: conference === "east" ? "2px solid #0a66c2" : "1px solid #ddd",
            background: conference === "east" ? "#f0f8ff" : "#fff",
          }}
        >
          East
        </button>

        <button
          type="button" className="conference_button"
          onClick={() => setConference("west")}
          style={{
            border: conference === "west" ? "2px solid #0a66c2" : "1px solid #ddd",
            background: conference === "west" ? "#f0f8ff" : "#fff",
          }}
        >
          West
        </button>
      </div>

      <table className="standings_table" style={{ width: "100%", borderCollapse: "collapse", minWidth: 420 }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "8px 12px" }}>#</th>
            <th style={{ textAlign: "left", padding: "8px 12px" }}>Team</th>
            <th style={{ padding: "8px 12px" }}>W</th>
            <th style={{ padding: "8px 12px" }}>L</th>
            <th style={{ padding: "8px 12px" }}>PCT</th>
            <th style={{ padding: "8px 12px" }}>GB</th>
          </tr>
        </thead>

        <tbody>
          {rows.map(row => (
            <tr key={row.teamId ?? row.team} style={{ borderTop: "1px solid #eee" }}>
              <td style={{ padding: "8px 12px" }}>{row.rank}</td>
              <td style={{ padding: "8px 12px" }}>
                {row.teamId ? <Link to={`/team/${row.teamId}`} style={{ color: "#0a66c2", textDecoration: "none" }}>{row.team}</Link> : row.team}
              </td>
              <td style={{ padding: "8px 12px", textAlign: "center" }}>{row.w}</td>
              <td style={{ padding: "8px 12px", textAlign: "center" }}>{row.l}</td>
              <td style={{ padding: "8px 12px", textAlign: "center" }}>{row.pct}</td>
              <td style={{ padding: "8px 12px", textAlign: "center" }}>{row.gb}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}