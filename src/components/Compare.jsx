import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default function Compare() {
    const [season, setSeason] = useState('2024-25')
    const [p1, setP1] = useState(null)
    const [p2, setP2] = useState(null)
    const [p1Name, setP1Name] = useState("") 
    const [p2Name, setP2Name] = useState("")
    const [playerList, setPlayerList] = useState([])
    const [hidden, setHidden] = useState(true) //hide the player select dropdowns until api is finished getting names
    const [p1Stats, setP1Stats] = useState(null)
    const [p2Stats, setP2Stats] = useState(null)
    const [loading, setLoading] = useState(false);

    const statRows = [
      ["Minutes", "mins"],
      ["Points", "pts"],
      ["FGM", "fgm"],
      ["FGA", "fga"],
      ["FG%", "fgPct"],
      ["3PM", "threePm"],
      ["3PA", "threePa"],
      ["3P%", "threePct"],
      ["FTM", "ftM"],
      ["FTA", "ftA"],
      ["FT%", "ftPct"],
      ["OREB", "oRebs"],
      ["DREB", "dRebs"],
      ["REB", "totalRebs"],
      ["AST", "assists"],
      ["TO", "turnovers"],
      ["STL", "steals"],
      ["BLK", "blocks"]
    ];

    const seasonsList = () => {
        const seasons = [];
        for (let i = 1947; i <= 2024; i++) {
            seasons.push(`${i}-${(i + 1) % 100}`);
        }
        return seasons;
    }
    const seasonOptions = seasonsList().reverse();

    useEffect(() => {
      const fetchData = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/players-by-season/${season}`)
        const data = await res.json()
        setPlayerList(data.names)
        setHidden(false)
      };
      fetchData();
    }, [season, p1, p2]);

    const getStats = async (e) => {
      e.preventDefault();
      setLoading(true);

    try {
      const params = new URLSearchParams({
        player1Id: p1,
        player2Id: p2,
        season: season,
      }).toString();

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/compare?${params}`);
      const data = await res.json();
      setP1Stats(data.p1stats);
      setP2Stats(data.p2stats);
    } catch (err) {
      setError(err.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };
   
    const seasonSubmit = (e) => {
        e.preventDefault()
        const selectedSeason = e.target.value
        setP1Stats(null)
        setP2Stats(null)
        setSeason(selectedSeason)
        setHidden(true)
    };

    const handleP1 = (e) => {
      setP1(e.target.value);
      const selectedPlayer = playerList.find(player => String(player.id) === e.target.value);
      setP1Name(selectedPlayer ? selectedPlayer.name : "");
      setP1Stats(null);
    };

    const handleP2 = (e) => {
      setP2(e.target.value);
      const selectedPlayer = playerList.find(player => String(player.id) === e.target.value);
      setP2Name(selectedPlayer ? selectedPlayer.name : "");
      setP2Stats(null);
    };

    const toNumber = (v) => {
      if (v == null) return NaN;
      if (typeof v === "number") return v;
      if (typeof v === "string") return Number(v.slice(0, -1));
    };

  return (
    <>
    <Navbar></Navbar>
    <div>
      <h1 style={{marginLeft: "2rem"}}>Compare Players</h1>
      <form style={{ display: "flex", gap: 8, marginTop: 12 , marginBottom: 12 }}>
        <label className="gamesForm" style={{marginLeft: "2rem", fontSize: "1rem", fontWeight: 400}}>Season
          <select className="season_select" value={season} onChange={seasonSubmit}>
            {seasonOptions.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
      </form>
      {(playerList.length > 0 && !hidden) && (
        <form onSubmit={getStats} className="player_form">
          <label className="gamesForm" style={{marginLeft: "2rem", fontSize: "1rem", fontWeight: 400}}>Player 1
            <select className="player_select" value={p1} onChange={handleP1} required>
              <option value="">Select Player</option>
              {playerList.map(player => (
                <option key={player.id} value={player.id}>{player.name}</option>
              ))}
            </select>
          </label>
          <label className="gamesForm" style={{marginLeft: "2rem", fontSize: "1rem", fontWeight: 400}}>Player 2
            <select className="player_select" value={p2} onChange={handleP2} required>
              <option value="">Select Player</option>
              {playerList.map(player => (
                <option key={player.id} value={player.id}>{player.name}</option>
              ))}
            </select>
        </label>
        <button type="submit" disabled={loading} style={{ padding: "0", borderRadius: 6, alignContent: "end", marginTop: 16, width: 70}}>
          {loading ? "Searching…" : "Search"}
        </button>
      </form>
    )}
    {
        p1Stats && p2Stats && (
          <div className="comparison_results">
            <table className="comparison_table">
              <thead>
                <tr>
                  <th>
                    <div className="comparison_img1">
                      <img src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${p1}.png`} alt={p1Name} />
                      <div style={{textAlign: "right", fontWeight: 700, fontSize: "1.5rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                        <Link to={`/players/${p1}`} style={{textDecoration: "none"}}>{p1Name}</Link>
                      </div>
                    </div>
                  </th>
                  <th></th>
                  <th>
                    <div className="comparison_img2">
                      <img src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${p2}.png`} alt={p2Name} />
                      <div style={{textAlign: "left", fontWeight: 700, fontSize: "1.5rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                        <Link to={`/players/${p2}`} style={{textDecoration: "none"}}>{p2Name}</Link>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                  {statRows.map(([label, key]) => {
                  const left = p1Stats[key];
                  const right = p2Stats[key];
                  const leftNum = toNumber(left);
                  const rightNum = toNumber(right);
                  return (
                    <tr key={key}>
                      <td className={leftNum > rightNum ? "statBetter" : ""} style={{ textAlign: "right" }}>{left ?? "—"}</td>
                      <td style={{ textAlign: "center", fontWeight: 600 }}>{label}</td>
                      <td className={rightNum > leftNum ? "statBetter" : ""} style={{ textAlign: "left" }}>{right ?? "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )
    }
    </div>
    </>
  );
}
