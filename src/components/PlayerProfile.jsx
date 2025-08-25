import InfoCard from "./InfoCard";
import Navbar from "./Navbar";
import Table from "./Table";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'

export default function PlayerProfile() {
    const { id } = useParams();
    const [player, setPlayer] = useState(null)
    const [seasonStats, setSeasonStats] = useState(null)
    const [yoyStats, setYoyStats] = useState(null)
    const [yoyPerGame, setYoyPerGame] = useState(false)

    const yoyForTable = (Array.isArray(yoyStats) ? yoyStats : []).map(s => {
     if (!yoyPerGame) return s
     const gp = Number(s.gp) || 1
     return {
       ...s,
       fgm: (Number(s.fgm) / gp).toFixed(1),
       fga: (Number(s.fga) / gp).toFixed(1),
       pts: (Number(s.pts) / gp).toFixed(1),
       reb: (Number(s.reb) / gp).toFixed(1),
       ast: (Number(s.ast) / gp).toFixed(1),
       stl: (Number(s.stl) / gp).toFixed(1),
       blk: (Number(s.blk) / gp).toFixed(1),
       tov: (Number(s.tov) / gp).toFixed(1),
       fantasy: (Number(s.fantasy) / gp).toFixed(1)
     }
   })

    useEffect(() => {
        async function fetchData(){
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/player-bio/${id}`)
          const data = await response.json()
          setPlayer(data.playerData)
        }
        fetchData();
      }, [id])

    useEffect(() => {
      async function fetchSeasonData(){
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/season-stats/${id}`)
        const data = await response.json()
        setSeasonStats(data.playerData)
      }
      fetchSeasonData();
    }, [id])

    useEffect(() => {
      async function fetchYoyData(){
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/season-stats-yoy/${id}`)
        const data = await response.json()
        setYoyStats(data)
      }
      fetchYoyData();
    }, [id])

    return (
        <div>
            <Navbar />
            {player ? <InfoCard title={player.name} birthdate={player.birthdate} country={player.country} school={player.school} height={player.height} weight={player.weight}
            exp={player.exp} jersey={player.jersey} position={player.position} teamId={player.teamId} team={player.team} draftInfo={player.draftInfo} rings={player.rings} 
            mvp={player.mvp} allNba={player.allNba} allStar={player.allStar} image={true} playerId={id} cardType={"bio"}
            categories={["Team", "Country", "School", "Height", "Weight", "Birthdate", "Exp", "Draft", "Championships", "MVP", "All-NBA", "All-Star"]}/> : <p>Loading...</p>}
            
            {seasonStats ? <InfoCard title={"Season Stats"} age={seasonStats.age} pts={seasonStats.pts} reb={seasonStats.reb} ast={seasonStats.ast} stl={seasonStats.stl} blk={seasonStats.blk} plusMinus={seasonStats.plusMinus} 
            tov={seasonStats.tov} gp={seasonStats.gp} fga={seasonStats.fga} fgm={seasonStats.fgm} fgPct={seasonStats.fgPct} threePct={seasonStats.threePct} ftPct={seasonStats.ftPct} record={seasonStats.record} fantasy={seasonStats.fantasy} image={false} cardType={"season"}
            categories={["Age", "GP", "Record", "FGM", "FGA", "FG%", "3P%", "FT%", "PTS", "REB", "AST", "STL", "BLK", "TOV", "Plus/Minus", "Fantasy Points"]} /> : <p>Loading...</p>}

            {yoyStats ? (
             <div style={{ width: '100%' }}>
                 <h3 style={{ textAlign: 'center' }}>Season Stats</h3>
                 <button
                   type="button"
                   onClick={() => setYoyPerGame(p => !p)}
                   style={{
                     borderRadius: 6,
                     border: '1px solid #ccc',
                     background: '#fff',
                     cursor: 'pointer',
                     height: '28px',
                     marginLeft: '2rem',
                   }}
                   aria-pressed={yoyPerGame}
                   title="Toggle totals / per game"
                 >
                   {yoyPerGame ? 'Show Totals' : 'Show Per Game'}
                 </button>

               <Table
                 data={yoyForTable}
                 type={"yoy"}
                 header={["Season", "Team", "GP", "Record", "FGM", "FGA", "FG%", "3P%", "FT%", "PTS", "REB", "AST", "STL", "BLK", "TOV", "+/-", "fPts"]}
               />
             </div>
           ) : <p>Loading...</p>}
        </div>
    )
}
