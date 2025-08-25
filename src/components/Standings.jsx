import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

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

export default function Standings() {
  const [conference, setConference] = useState("east") // "east" | "west"
  const [eastData, setEastData] = useState();
  const [westData, setWestData] = useState();
  const rows = conference == "east" ? eastData : westData;

  useEffect(() => {
    const fetchStandings = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/standings`);
      const data = await response.json();
      setEastData(data.east);
      setWestData(data.west);
    }
    fetchStandings();
  }, [])

  return (
    <>
    <Navbar />
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

      {eastData && westData ? (
        <table className="standings_table" style={{ width: "100%", borderCollapse: "collapse", minWidth: 420 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "8px 12px" }}>#</th>
              <th style={{ textAlign: "left", padding: "8px 12px" }}>Team</th>
            <th style={{ padding: "8px 12px" }}>Record</th>
            <th style={{ padding: "8px 12px" }}>PCT</th>
            <th style={{ padding: "8px 12px" }}>GB</th>
            <th style={{ padding: "8px 12px" }}>Conf</th>
            <th style={{ padding: "8px 12px" }}>Home</th>
            <th style={{ padding: "8px 12px" }}>Away</th>
            <th style={{ padding: "8px 12px" }}>L10</th>
            <th style={{ padding: "8px 12px" }}>Streak</th>
          </tr>
        </thead>

        <tbody>
          {rows.map(row => {
            let bg;
            if(row.playoffs == 1){
              bg = "#e9f7ef";
            }else if(row.playin == 1){
              bg = "#fff8e6";
            }else{
              bg = "transparent";
            }

            return (
              <tr key={row.name} style={{ borderTop: "1px solid #eee", background: bg }}>
                <td style={{ padding: "8px 12px" }}>{row.pos}</td>
                <td style={{ padding: "8px 12px" }}>
                  {row.id ? <Link to={`/team/${row.id}`} style={{ color: "#0a66c2", textDecoration: "none" }}>{row.name}</Link> : row.name}
                </td>
                <td style={{ padding: "8px 12px", textAlign: "center" }}>{row.record}</td>
                <td style={{ padding: "8px 12px", textAlign: "center" }}>{row.winPercentage}</td>
                <td style={{ padding: "8px 12px", textAlign: "center" }}>{row.gb}</td>
                <td style={{ padding: "8px 12px", textAlign: "center" }}>{row.confR}</td>
                <td style={{ padding: "8px 12px", textAlign: "center" }}>{row.homeR}</td>
                <td style={{ padding: "8px 12px", textAlign: "center" }}>{row.awayR}</td>
                <td style={{ padding: "8px 12px", textAlign: "center" }}>{row.L10}</td>
                <td style={{ padding: "8px 12px", position: "relative", minWidth: 96 }}>
                  <span style={{ display: "inline-block", width: "100%", textAlign: "center" }}>{row.streak}</span>
                  {row.streakInt > 2 && (
                    <span style={{ position: "absolute", right: "70px", top: "50%", transform: "translateY(-50%)" }}>🔥</span>
                  )}
                  {row.streakInt < -2 && (
                    <span style={{ position: "absolute", right: "70px", top: "50%", transform: "translateY(-50%)"}}>❄️</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table> ) : <p>Loading...</p>}
    </section>
    </>
  )
}