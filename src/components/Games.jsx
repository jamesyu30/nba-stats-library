import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function Games() {
  const [teamId, setTeamId] = useState(1610612738); //team id of second drop down
  const [season, setSeason] = useState("2024-25");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [teamOne, setTeamOne] = useState(1610612737); //team id of first drop down


const nbaTeams = [
  { id: 1610612737, name: "Atlanta Hawks" },
  { id: 1610612738, name: "Boston Celtics" },
  { id: 1610612751, name: "Brooklyn Nets" },
  { id: 1610612766, name: "Charlotte Hornets" },
  { id: 1610612741, name: "Chicago Bulls" },
  { id: 1610612739, name: "Cleveland Cavaliers" },
  { id: 1610612742, name: "Dallas Mavericks" },
  { id: 1610612743, name: "Denver Nuggets" },
  { id: 1610612765, name: "Detroit Pistons" },
  { id: 1610612744, name: "Golden State Warriors" },
  { id: 1610612745, name: "Houston Rockets" },
  { id: 1610612754, name: "Indiana Pacers" },
  { id: 1610612746, name: "Los Angeles Clippers" },
  { id: 1610612747, name: "Los Angeles Lakers" },
  { id: 1610612763, name: "Memphis Grizzlies" },
  { id: 1610612748, name: "Miami Heat" },
  { id: 1610612749, name: "Milwaukee Bucks" },
  { id: 1610612750, name: "Minnesota Timberwolves" },
  { id: 1610612740, name: "New Orleans Pelicans" },
  { id: 1610612752, name: "New York Knicks" },
  { id: 1610612760, name: "Oklahoma City Thunder" },
  { id: 1610612753, name: "Orlando Magic" },
  { id: 1610612755, name: "Philadelphia 76ers" },
  { id: 1610612756, name: "Phoenix Suns" },
  { id: 1610612757, name: "Portland Trail Blazers" },
  { id: 1610612758, name: "Sacramento Kings" },
  { id: 1610612759, name: "San Antonio Spurs" },
  { id: 1610612761, name: "Toronto Raptors" },
  { id: 1610612762, name: "Utah Jazz" },
  { id: 1610612764, name: "Washington Wizards" }
];

    const seasonsList = () => {
        const seasons = [];
        for (let i = 1947; i <= 2025; i++) {
            seasons.push(`${i}-${(i + 1) % 100}`);
        }
        return seasons;
    }
    const seasonOptions = seasonsList().reverse();

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      setResults(null);

    try {
      const params = new URLSearchParams({
        TeamID: teamOne,
        Season: season,
        VsTeamID: teamId || ""
      }).toString();

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/games?${params}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError(err.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar />
    <div style={{ maxWidth: 900, margin: "1rem auto", padding: "0 1rem" }}>
      <h1>Games</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginTop: 12 , marginBottom: 12 }}>
        <label className="gamesForm">
          Team 1
          <select id="team1_drop" name="team1"  onChange={(e) => setTeamOne(Number(e.target.value))}  value={teamOne} style={{ padding: 8, borderRadius: 6, border: "1px solid #ddd", minWidth: 200 }}>
            {
                nbaTeams.map((team) => (
                    <option
                    key={team.id}
                    value={team.id}
                    >
                    {team.name}
                    </option>
                ))
            }
        </select>
        </label>

        <label className="gamesForm">
        Team 2
        <select
          id="team2_drop"
          name="team2"
          value={teamId}
          onChange={(e) => setTeamId(Number(e.target.value))}
          style={{ padding: 8, borderRadius: 6, border: "1px solid #ddd", minWidth: 200 }}
        >
           <option key={"none"} value={null}>None</option>
          {nbaTeams.map((team) => (
            <option key={team.id} value={team.id} disabled={team.id === teamOne}>
              {team.name}
            </option>
          ))}
        </select>
        </label>

        <label className="gamesForm">
          Season
          <select value={season} onChange={(e) => setSeason(e.target.value)} style={{ padding: 8, borderRadius: 6, border: "1px solid #ddd", minWidth: 120 }}>
            {seasonOptions.map((season) => (
              <option key={season} value={season}>
                {season}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" disabled={loading} style={{ padding: "0", borderRadius: 6, alignContent: "end", marginTop: 16, width: 70}}>
          {loading ? "Searching…" : "Search"}
        </button>
      </form>

      {error && <div style={{ color: "crimson", marginBottom: 12 }}>Error: {error}</div>}

      {results ? (
        <div style={{ marginTop: 12 }}>
          <h3>Results</h3>
          {results.map((game) => (
            <Link
              to={`/games/${game.gameId}`}
              key={game.gameId}
              className="gameResults_game_link"
              
            >
            <div className="gameResults" key={game.gameId} style={{ marginBottom: 12 }}>
              <strong>{game.date} ({game.location})</strong> <span>{game.matchup} - {game.homeScore} : {game.awayScore} {game.wl == "L" ? <span className="lost">L</span> : <span className="won">W</span>}</span>
            </div>
            </Link>
          ))}
        </div>
      ) : (
        <div style={{ color: "#666" }}>No results yet — submit the form above.</div>
      )}
    </div>
    </>
  );
}