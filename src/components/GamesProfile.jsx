import Navbar from "./Navbar";
import LoadingCard from "./LoadingCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function GamesProfile() {
  const { gameId } = useParams();
  const [gameData, setGameData] = useState(null);
  const [homePlayer, setHomePlayer] = useState(null); //home team player stats
  const [awayPlayer, setAwayPlayer] = useState(null); //away team player stats
  const [homeTeam, setHomeTeam] = useState(null); //home team stats
  const [awayTeam, setAwayTeam] = useState(null); //away team stats
  const [teamOne, setTeamOne] = useState(true); //toggle between home and away team box score


  useEffect(() => {
    const fetchGameData = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/boxscore/${gameId}`);
      const data = await response.json();
      setGameData(data.gameStats);
    }
    fetchGameData();
  }, []);

  useEffect(() => {
    const fetchPlayerData = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/playergamestats/${gameId}`);
      const data = await response.json();
      setHomePlayer(data.homePlayerStats);
      setAwayPlayer(data.awayPlayerStats);
      setHomeTeam(data.homeTeamStats);
      setAwayTeam(data.awayTeamStats);
    }
    fetchPlayerData();
  }, []);

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

  //maps team name to their ids
  const nameToId = (name) => {
    const team = nbaTeams.find(t => t.name === name);
    return team ? team.id : null;
  }

  return (
    <div>
      <Navbar />
      {(gameData && homePlayer && awayPlayer && homeTeam && awayTeam) ? (
        <>
        <div className="game_profile_info">
          <p><strong>{gameData.date}</strong> - Attendance: {gameData.attendance ?? "N/A"}</p>
          <div className="team_wrapper">
          <div className="home_team">
            <img src={`https://raw.githubusercontent.com/gtkacz/nba-logo-api/main/icons/${gameData.teamAbv}.svg`} alt={`${gameData.teamName} logo`} className="team_logo" />
            <h2 className="games_team"><Link to={`/team/${nameToId(gameData.teamName)}`} style={{textDecoration: 'none'}}>{gameData.teamName}</Link></h2>
            <p className="games_record">({gameData.teamRecord ?? "N/A"})</p>
          </div>
          <div className="away_team">
            <img src={`https://raw.githubusercontent.com/gtkacz/nba-logo-api/main/icons/${gameData.oppTeamAbv}.svg`} alt={`${gameData.oppTeamName} logo`} className="team_logo" />
            <h2 className="games_team"><Link to={`/team/${nameToId(gameData.oppTeamName)}`} style={{textDecoration: 'none'}}>{gameData.oppTeamName}</Link></h2>
            <p className="games_record">({gameData.oppTeamRecord ?? "N/A"})</p>
          </div>
          </div>
        </div>
        <div className="game_stats">
          <table className="scoreTable">
            <thead>
              <tr>
                {gameData.headers.map((header) => (
                  <th key={header} className="game_score_header">{header}</th>
                ))}
                <th className="game_score_header">Total</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td>{gameData.teamName}</td>
                  {gameData.teamPoints.map((points, index) => (
                    <td key={index}>{points}</td>
                  ))}
                  <td>{gameData.totalPoints}</td>
                </tr>
                <tr>
                  <td>{gameData.oppTeamName}</td>
                  {gameData.oppTeamPoints.map((points, index) => (
                    <td key={index}>{points > 0 ? points : null}</td>
                  ))}
                  <td>{gameData.oppTotalPoints}</td>
                </tr>
            </tbody>
          </table>
        </div>
        <div className="team_stats">
          <table className="team_stats_table">
            <thead>
              <tr>
                <th className="team_stats_header">Team</th>
                <th className="team_stats_header">FG</th>
                <th className="team_stats_header">FG%</th>
                <th className="team_stats_header">3P</th>
                <th className="team_stats_header">3P%</th>
                <th className="team_stats_header">FT</th>
                <th className="team_stats_header">FT%</th>
                <th className="team_stats_header">OREB</th>
                <th className="team_stats_header">REB</th>
                <th className="team_stats_header">AST</th>
                <th className="team_stats_header">STL</th>
                <th className="team_stats_header">BLK</th>
                <th className="team_stats_header">TO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{homeTeam.teamName}</td>
                <td>{homeTeam.fieldGoals}</td>
                <td>{homeTeam.fieldGoalsPct}</td>
                <td>{homeTeam.threePoints}</td>
                <td>{homeTeam.threePointsPct}</td>
                <td>{homeTeam.freeThrows}</td>
                <td>{homeTeam.freeThrowsPct}</td>
                <td>{homeTeam.offensiveRebounds}</td>
                <td>{homeTeam.rebounds}</td>
                <td>{homeTeam.assists}</td>
                <td>{homeTeam.steals}</td>
                <td>{homeTeam.blocks}</td>
                <td>{homeTeam.turnovers}</td>
              </tr>
              <tr>
                <td>{awayTeam.teamName}</td>
                <td>{awayTeam.fieldGoals}</td>
                <td>{awayTeam.fieldGoalsPct}</td>
                <td>{awayTeam.threePoints}</td>
                <td>{awayTeam.threePointsPct}</td>
                <td>{awayTeam.freeThrows}</td>
                <td>{awayTeam.freeThrowsPct}</td>
                <td>{awayTeam.offensiveRebounds}</td>
                <td>{awayTeam.rebounds}</td>
                <td>{awayTeam.assists}</td>
                <td>{awayTeam.steals}</td>
                <td>{awayTeam.blocks}</td>
                <td>{awayTeam.turnovers}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <div className="box_score_wrapper">
            <div className="box_score_toggle">
              <button
          type="button" className="conference_button"
          onClick={() => setTeamOne(true)}
          style={{
            border: teamOne === true ? "2px solid #0a66c2" : "1px solid #ddd",
            background: teamOne === true ? "#f0f8ff" : "#fff",
          }}
        >
          {homeTeam.teamName}
        </button>

        <button
          type="button" className="conference_button"
          onClick={() => setTeamOne(false)}
          style={{
            border: teamOne === false ? "2px solid #0a66c2" : "1px solid #ddd",
            background: teamOne === false ? "#f0f8ff" : "#fff",
          }}
        >
          {awayTeam.teamName}
        </button>
            </div>
          <table className="game_box_score">
            <thead>
              <tr style={{textAlign: "left"}}>
                <th>Name</th>
                <th>MIN</th>
                <th>PTS</th>
                <th>FG</th>
                <th>3P</th>
                <th>FT</th>
                <th>REB</th>
                <th>AST</th>
                <th>STL</th>
                <th>BLK</th>
                <th>TO</th>
                <th>+/-</th>
              </tr>
            </thead>
            <tbody>
              {(teamOne ? homePlayer : awayPlayer).map((player) => (
                <tr key={player.playerId}>
                  <td><Link to={`/players/${player.playerId}`} style={{textDecoration: "none"}}>{player.playerName}</Link></td>
                  {player.minutes ? (
                    <td>{player.minutes}</td>
                  ) : (
                    <td>0:00</td>
                  )}
                  <td>{player.points}</td>
                  <td>{player.fieldGoals}</td>
                  <td>{player.threePoints}</td>
                  <td>{player.freeThrows}</td>
                  <td>{player.rebounds}</td>
                  <td>{player.assists}</td>
                  <td>{player.steals}</td>
                  <td>{player.blocks}</td>
                  <td>{player.turnovers}</td>
                  <td>{player.plusMinus}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
        </>
      ) : (
        <LoadingCard />
      )}
    </div>
  );
}

