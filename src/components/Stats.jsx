import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function Stats() {
    const [pgNum, setPgNum] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageItems, setPageItems] = useState([]);
    const [playerStats, setPlayerStats] = useState([]);
    const [seasonType, setSeasonType] = useState("Regular+Season");
    const [perMode, setPerMode] = useState("PerGame");
    const [season, setSeason] = useState("2024-25");
    const [sortCol, setSortCol] = useState('') //column to be sorted
    const [sortOrder, setSortOrder] = useState('') //asc or desc

    const seasonsList = () => {
        const seasons = [];
        for (let i = 1996; i <= 2024; i++) {
            seasons.push(`${i}-${(i + 1) % 100}`);
        }
        return seasons;
    }
    const seasonOptions = seasonsList().reverse();

    const PER_PAGE = 25; // rows per page

    function dataSort(column, order, arr){ //column = what col to be sorted, order = asc/desc, arr = array to be sorted
      if(order != "" && column != ""){
        const sortedData = [...arr].sort((a, b) => {
        const aValue = a[column]
        const bValue = b[column]
        console.log("aValue:", typeof aValue);
        if (typeof(aValue) == 'number'){
          if (order === 'asc'){
            return aValue - bValue
          }
          else{
            return bValue - aValue
          }
        }
        else if(parseFloat(aValue) && parseFloat(bValue)){
          if (order === 'asc'){
            return parseFloat(aValue) - parseFloat(bValue)
          }
          else{
            return parseFloat(bValue) - parseFloat(aValue)
          }
        }
        else if(aValue.endsWith('%')){
          if (order === 'asc'){
            return parseFloat(aValue.slice(0, -1)) - parseFloat(bValue.slice(0, -1))
          }
          else{
            return parseFloat(bValue.slice(0, -1)) - parseFloat(aValue.slice(0, -1))
          }
        }
        else{
          const sa = String(aValue).toLowerCase()
          const sb = String(bValue).toLowerCase()
          if (order === 'desc'){
            return sa.localeCompare(sb)
          }
          else{
            return sb.localeCompare(sa)
          }
        }
      })
      return sortedData;
    }
    return arr;
  }

  function handleSort(column){
    const nextOrder = (sortCol === column) ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'desc';
    setSortCol(column);
    setSortOrder(nextOrder);
    setPlayerStats(dataSort(column, nextOrder, playerStats));
  }

    useEffect(() => {
        const tp = Math.max(0, Math.ceil(playerStats.length / PER_PAGE));
        setTotalPages(tp);

        const startIndex = (pgNum - 1) * PER_PAGE;
        setPageItems(playerStats.slice(startIndex, startIndex + PER_PAGE));
    }, [playerStats, pgNum, PER_PAGE]);

    useEffect(() => {
        const fetchPlayerStats = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/playerstats?seasonType=${seasonType}&perMode=${perMode}&season=${season}`);
            const data = await response.json();
            setPlayerStats(data);
        };
        fetchPlayerStats();
    }, [seasonType, perMode, season]);

    return (
        <>
            <Navbar />
            
            <div className="stats_controls">
                <label htmlFor="season" className="stats_label">Season
                <select id="season" value={season} onChange={(e) => setSeason(e.target.value)}>
                    {
                        seasonOptions.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))
                    }
                </select>
                </label>
                <label htmlFor="seasonType" className="stats_label">Season Type
                <select id="seasonType" value={seasonType} onChange={(e) => setSeasonType(e.target.value)}>
                    <option value="Regular+Season">Regular Season</option>
                    <option value="Playoffs">Playoffs</option>
                </select>
                </label>
                <label htmlFor="perMode" className="stats_label">Per Mode
                <select id="perMode" value={perMode} onChange={(e) => setPerMode(e.target.value)}>
                    <option value="PerGame">Per Game</option>
                    <option value="Totals">Totals</option>
                </select>
                </label>
            </div>
            <div className="stats_pagination">
                <button onClick={() => setPgNum((prev) => Math.max(prev - 1, 1))}>{'<'}</button>
                <span> {pgNum} / {totalPages} </span>
                <button onClick={() => setPgNum((prev) => Math.min(prev + 1, totalPages))}>{'>'}</button>
            </div>
            <div className="stats_table_wrapper">
                <table className="stats_table">
                    <colgroup><col style={{width: '10%'}}/></colgroup>
                    <thead>
                        <tr style={{cursor: "pointer"}}>
                            <th onClick={() => handleSort('name')}>Name { sortCol == 'name' ? (sortOrder === 'asc' ? '▲' : '▼') : '⇵'}</th>
                            <th onClick={() => handleSort('team')}>Team { sortCol == 'team' ? (sortOrder === 'asc' ? '▲' : '▼') : '⇵'}</th>
                            <th onClick={() => handleSort('age')}>Age { sortCol == 'age' ? (sortOrder === 'asc' ? '▲' : '▼') : '⇵'}</th>
                            <th onClick={() => handleSort('gp')}>GP { sortCol == 'gp' ? (sortOrder === 'asc' ? '▲' : '▼') : '⇵'}</th>
                            <th onClick={() => handleSort('mins')}>MINS { sortCol == 'mins' ? (sortOrder === 'asc' ? '▲' : '▼') : '⇵'}</th>
                            <th onClick={() => handleSort('pts')}>PTS { sortCol == 'pts' ? (sortOrder === 'asc' ? '▲' : '▼') : '⇵'}</th>
                            <th onClick={() => handleSort('fgm')}>FGM { sortCol == 'fgm' ? (sortOrder === 'asc' ? '▲' : '▼') : '⇵'}</th>
                            <th onClick={() => handleSort('fga')}>FGA { sortCol == 'fga' ? (sortOrder === 'asc' ? '▲' : '▼') : '⇵'}</th>
                            <th onClick={() => handleSort('fgPct')}>FG% { sortCol == 'fgPct' ? (sortOrder === 'asc' ? '▲' : '▼') : '⇵'}</th>
                            <th onClick={() => handleSort('fg3m')}>3PM { sortCol == 'fg3m' ? (sortOrder === 'asc' ? '▲' : '▼') : '⇵'}</th>
                            <th onClick={() => handleSort('fg3a')}>3PA { sortCol == 'fg3a' ? (sortOrder === 'asc' ? '▲' : '▼') : '⇵'}</th>
                            <th onClick={() => handleSort('fg3Pct')}>3P% { sortCol == 'fg3Pct' ? (sortOrder === 'asc' ? '▲' : '▼') : '⇵'}</th>
                            <th onClick={() => handleSort('ftm')}>FTM { sortCol == 'ftm' ? (sortOrder === 'asc' ? '▲' : '▼') : '⇵'}</th>
                            <th onClick={() => handleSort('fta')}>FTA { sortCol == 'fta' ? (sortOrder === 'asc' ? '▲' : '▼') : '⇵'}</th>
                            <th onClick={() => handleSort('ftPct')}>FT% { sortCol == 'ftPct' ? (sortOrder === 'asc' ? '▲' : '▼') : '⇵'}</th>
                            <th onClick={() => handleSort('oreb')}>OREB { sortCol == 'oreb' ? (sortOrder === 'asc' ? '▲' : '▼') : '⇵'}</th>
                            <th onClick={() => handleSort('dreb')}>DREB { sortCol == 'dreb' ? (sortOrder === 'asc' ? '▲' : '▼') : '⇵'}</th>
                            <th onClick={() => handleSort('reb')}>REB { sortCol == 'reb' ? (sortOrder === 'asc' ? '▲' : '▼') : '⇵'}</th>
                            <th onClick={() => handleSort('ast')}>AST { sortCol == 'ast' ? (sortOrder === 'asc' ? '▲' : '▼') : '⇵'}</th>
                            <th onClick={() => handleSort('tov')}>TOV { sortCol == 'tov' ? (sortOrder === 'asc' ? '▲' : '▼') : '⇵'}</th>
                            <th onClick={() => handleSort('stl')}>STL { sortCol == 'stl' ? (sortOrder === 'asc' ? '▲' : '▼') : '⇵'}</th>
                            <th onClick={() => handleSort('blk')}>BLK { sortCol == 'blk' ? (sortOrder === 'asc' ? '▲' : '▼') : '⇵'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map through player stats data and create table rows */}
                        {pageItems.map((player) => (
                            <tr key={player.id}>
                                <td><Link to={`/players/${player.id}`} className="stats_table_link">{player.name}</Link></td>
                                <td><Link to={`/team/${player.teamId}`} className="stats_table_link">{player.team}</Link></td>
                                <td>{player.age}</td>
                                <td>{player.gp}</td>
                                <td>{player.mins}</td>
                                <td>{player.pts}</td>
                                <td>{player.fgm}</td>
                                <td>{player.fga}</td>
                                <td>{player.fgPct}</td>
                                <td>{player.fg3m}</td>
                                <td>{player.fg3a}</td>
                                <td>{player.fg3Pct}</td>
                                <td>{player.ftm}</td>
                                <td>{player.fta}</td>
                                <td>{player.ftPct}</td>
                                <td>{player.oreb}</td>
                                <td>{player.dreb}</td>
                                <td>{player.reb}</td>
                                <td>{player.ast}</td>
                                <td>{player.tov}</td>
                                <td>{player.stl}</td>
                                <td>{player.blk}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}