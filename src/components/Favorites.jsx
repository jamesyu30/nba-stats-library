import { useCookies } from "react-cookie";
import Navbar from "./Navbar.jsx";
import InfoCard from "./InfoCard.jsx";
import LoadingCard from "./LoadingCard.jsx";
import {useState, useEffect} from 'react'
import { Link } from "react-router-dom";

export default function Favorites() {
const [cookies, setCookie, removeCookie] = useCookies(['favPlayer', 'favTeam']);
const [player, setPlayer] = useState(null)
const [teamData, setTeamData] = useState(null);

    useEffect(() => {
        async function fetchData(){
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/player-bio/${cookies.favPlayer}`)
          const data = await response.json()
          setPlayer(data.playerData)
        }
        fetchData();
      }, [cookies.favPlayer]);

    useEffect(() => {
        const fetchTeamData = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/team-info/${cookies.favTeam}`);
            const data = await response.json();
            setTeamData(data.teamData)
        };
        fetchTeamData();
    }, [cookies.favTeam]);

  return (
    <div>
      <Navbar />
      {cookies.favPlayer ? (
        <div>
          <h3 className="favorites_title">Favorite Player</h3>
          {player ? <Link to={`/players/${cookies.favPlayer}`} style={{textDecoration: 'none'}}><InfoCard title={player.name} birthdate={player.birthdate} country={player.country} school={player.school} height={player.height} weight={player.weight}
                      exp={player.exp} jersey={player.jersey} position={player.position} teamId={player.teamId} team={player.team} draftInfo={player.draftInfo} rings={player.rings}
                      mvp={player.mvp} allNba={player.allNba} allStar={player.allStar} image={true} playerId={cookies.favPlayer} cardType={"bio"}
                      categories={["Team", "Country", "School", "Height", "Weight", "Birthdate", "Exp", "Draft", "Championships", "MVP", "All-NBA", "All-Star"]}/></Link> : <LoadingCard />}
        </div>
      ) : (
        <p className="no_favorites">No favorite player selected. Click the star icon in a player card to add them to your favorites.</p>
      )}
      {cookies.favTeam ? (
        <div>
          <h3 className="favorites_title">Favorite Team</h3>
          {teamData ? <Link to={`/team/${cookies.favTeam}`} style={{ textDecoration: 'none' }}><InfoCard title={teamData.name} arena={teamData.arena} owner={teamData.owner} generalManager={teamData.generalManager} headCoach={teamData.headCoach}
                championships={teamData.championships} yearFounded={teamData.yearFounded} abv={teamData.abv} gleague={teamData.gleague} facebook={teamData.facebook} insta={teamData.insta} twitter={teamData.twitter}
                image={true} cardType={"teamInfo"} teamId={cookies.favTeam} categories={["Owner", "GM", "Head Coach", "Founded", "Arena", "G-League", "Championships"]}/></Link> : <LoadingCard />}
        </div>
      ) : (
        <p className="no_favorites">No favorite team selected. Click the star icon in a team card to add them to your favorites.</p>
      )}
    </div>
  );
}
