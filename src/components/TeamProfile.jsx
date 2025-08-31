import InfoCard from "./InfoCard";
import Navbar from "./Navbar";
import Table from "./Table";
import LoadingCard from "./LoadingCard";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'

export default function TeamProfile() {
    const { id } = useParams();
    const [teamData, setTeamData] = useState(null);
    const [franchiseLeaders, setFranchiseLeaders] = useState(null);
    const [roster, setRoster] = useState(null);
    const [coaches, setCoaches] = useState(null);
    const [rosterToggle, setRosterToggle] = useState(true); //by default display roster in table

    function handleClick() {
        setRosterToggle(!rosterToggle);
    }

    useEffect(() => {
        const fetchTeamData = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/team-info/${id}`);
            const data = await response.json();
            setTeamData(data.teamData)
        };
        fetchTeamData();
    }, [id]);

    useEffect(() => {
        const fetchFranchiseLeaders = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/franchise-leaders/${id}`);
            const data = await response.json();
            setFranchiseLeaders(data.franchiseData);
        };
        fetchFranchiseLeaders();
    }, [id]);

    useEffect(() => {
        const fetchRoster = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/roster/${id}`);
            const data = await response.json();
            setRoster(data.teamRoster);
            setCoaches(data.coaches);
        };
        fetchRoster();
    }, [id]);

  return (
    <div>
      <Navbar />
      {teamData ? <InfoCard title={teamData.name} arena={teamData.arena} owner={teamData.owner} generalManager={teamData.generalManager} headCoach={teamData.headCoach}
      championships={teamData.championships} yearFounded={teamData.yearFounded} abv={teamData.abv} gleague={teamData.gleague} facebook={teamData.facebook} insta={teamData.insta} twitter={teamData.twitter}
      image={true} cardType={"teamInfo"} teamId={id} categories={["Owner", "GM", "Head Coach", "Founded", "Arena", "G-League", "Championships"]}/> : <LoadingCard />}

      {franchiseLeaders ? <InfoCard title={"Franchise Leaders"} pts={franchiseLeaders.pts} reb={franchiseLeaders.reb} ast={franchiseLeaders.ast} blk={franchiseLeaders.blk} stl={franchiseLeaders.stl} 
      ptsId={franchiseLeaders.ptsId} rebId={franchiseLeaders.rebId} astId={franchiseLeaders.astId} blkId={franchiseLeaders.blkId} stlId={franchiseLeaders.stlId}
      ptsName={franchiseLeaders.ptsName} rebName={franchiseLeaders.rebName} astName={franchiseLeaders.astName} blkName={franchiseLeaders.blkName} stlName={franchiseLeaders.stlName}
      image={false} cardType={"franchiseLeaders"} teamId={id} categories={["Points", "Rebounds", "Assists", "Blocks", "Steals"]}/> : <LoadingCard />}

      {(roster && coaches) ? (rosterToggle ? (
        <Table data={roster} type={"roster"} header={["Name", "Position", "Age", "Exp", "Height", "Weight", "Acquired"]} title={"Roster"} handleClick={handleClick} rosterToggle={rosterToggle}/>
      ) : (
        <Table data={coaches} type={"coaches"} header={["Name", "Position"]} title={"Coaches"} handleClick={handleClick} rosterToggle={rosterToggle}/>
      )) : <LoadingCard />}

    </div>
  );
}
