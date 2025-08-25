import { useState } from "react";
import Navbar from "./Navbar.jsx";
import TeamCard from "./TeamCard.jsx";

export default function Teams() {
  const [conference, setConference] = useState("east");

  const nbaTeamIds = [
  1610612737, //Atlanta Hawks
  1610612738, //Boston Celtics
  1610612751, //Brooklyn Nets
  1610612766, //Charlotte Hornets
  1610612741, //Chicago Bulls 4
  1610612739, //Cleveland Cavaliers 5
  1610612742, //Dallas Mavericks 5
  1610612743, //Denver Nuggets 7
  1610612765, //Detroit Pistons
  1610612744, //Golden State Warriors
  1610612745, //Houston Rockets 10
  1610612754, //Indiana Pacers
  1610612746, //Los Angeles Clippers
  1610612747, //Los Angeles Lakers
  1610612763, //Memphis Grizzlies
  1610612748, //Miami Heat 15
  1610612749, //Milwaukee Bucks 16
  1610612750, //Minnesota Timberwolves 17
  1610612740, //New Orleans Pelicans 18
  1610612752, //New York Knicks 19
  1610612760, //Oklahoma City Thunder
  1610612753, //Orlando Magic
  1610612755, //Philadelphia 76ers 22
  1610612756, //Phoenix Suns 23
  1610612757, //Portland Trail Blazers 24
  1610612758, //Sacramento Kings 25
  1610612759, //San Antonio Spurs 26
  1610612761, //Toronto Raptors 27
  1610612762, //Utah Jazz 28
  1610612764  //Washington Wizards 29
];

  return (
    <>
    <Navbar />
    <section className="teams">
        <h1 className="teams_title">Teams</h1>
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

    {conference === "east" &&
    <>     
    <div className="atlantic" style={{ display: "inline-flex", flexDirection: "column", paddingLeft: "0.875rem", gap: 16, width: "33%" }}>
        <h2 className="conference_title">Atlantic Division</h2>
        <TeamCard
          teamId={nbaTeamIds[1]}
          name={"Boston Celtics"}
          abv={"bos"}
        />
        <TeamCard
          teamId={nbaTeamIds[2]}
          name={"Brooklyn Nets"}
          abv={"bkn"}
        />
        <TeamCard
          teamId={nbaTeamIds[19]}
          name={"New York Knicks"}
          abv={"nyk"}
        />
        <TeamCard
          teamId={nbaTeamIds[22]}
          name={"Philadelphia 76ers"}
          abv={"phi"}
        />
        <TeamCard
          teamId={nbaTeamIds[27]}
          name={"Toronto Raptors"}
          abv={"tor"}
        />
    </div>

    <div className="central" style={{ display: "inline-flex", flexDirection: "column", gap: 16, width: "33%" }}>
      <h2 className="conference_title">Central Division</h2>
      <TeamCard
        teamId={nbaTeamIds[4]}
        name={"Chicago Bulls"}
        abv={"chi"}
      />
      <TeamCard
        teamId={nbaTeamIds[5]}
        name={"Cleveland Cavaliers"}
        abv={"cle"}
      />
      <TeamCard
        teamId={nbaTeamIds[8]}
        name={"Detroit Pistons"}
        abv={"det"}
      />
      <TeamCard
        teamId={nbaTeamIds[11]}
        name={"Indiana Pacers"}
        abv={"ind"}
      />
      <TeamCard
        teamId={nbaTeamIds[16]}
        name={"Milwaukee Bucks"}
        abv={"mil"}
      />
    </div>

    <div className="southeast" style={{ display: "inline-flex", flexDirection: "column", gap: 16, width: "33%" }}>
      <h2 className="conference_title">Southeast Division</h2>
      <TeamCard
        teamId={nbaTeamIds[0]}
        name={"Atlanta Hawks"}
        abv={"atl"}
      />
      <TeamCard
        teamId={nbaTeamIds[3]}
        name={"Charlotte Hornets"}
        abv={"cha"}
      />   
      <TeamCard
        teamId={nbaTeamIds[15]}
        name={"Miami Heat"}
        abv={"mia"}
      />
      <TeamCard
        teamId={nbaTeamIds[21]}
        name={"Orlando Magic"}
        abv={"orl"}
      />
      <TeamCard
        teamId={nbaTeamIds[29]}
        name={"Washington Wizards"}
        abv={"was"}
      />
    </div>
    </>
    }

    {conference === 'west' &&
        <>
          <div className="northwest" style={{ display: "inline-flex", flexDirection: "column", paddingLeft: "0.875rem", gap: 16, width: "33%" }}>
            <h2 className="conference_title">Northwest Division</h2>
            <TeamCard
              teamId={nbaTeamIds[7]}
              name={"Denver Nuggets"}
              abv={"den"}
            />
            <TeamCard
              teamId={nbaTeamIds[17]}
              name={"Minnesota Timberwolves"}
              abv={"min"}
            />
            <TeamCard
              teamId={nbaTeamIds[20]}
              name={"Oklahoma City Thunder"}
              abv={"okc"}
            />
            <TeamCard
              teamId={nbaTeamIds[24]}
              name={"Portland Trail Blazers"}
              abv={"por"}
            />
            <TeamCard
              teamId={nbaTeamIds[28]}
              name={"Utah Jazz"}
              abv={"uta"}
            />
          </div>

          <div className="pacific" style={{ display: "inline-flex", flexDirection: "column", gap: 16, width: "33%" }}>
            <h2 className="conference_title">Pacific Division</h2>
            <TeamCard
              teamId={nbaTeamIds[9]}
              name={"Golden State Warriors"}
              abv={"gsw"}
            />
            <TeamCard
              teamId={nbaTeamIds[12]}
              name={"Los Angeles Clippers"}
              abv={"lac"}
            />
            <TeamCard
              teamId={nbaTeamIds[13]}
              name={"Los Angeles Lakers"}
              abv={"lal"}
            />
            <TeamCard
              teamId={nbaTeamIds[23]}
              name={"Phoenix Suns"}
              abv={"phx"}
            />
            <TeamCard
              teamId={nbaTeamIds[25]}
              name={"Sacramento Kings"}
              abv={"sac"}
            />
          </div>

          <div className="southwest" style={{ display: "inline-flex", flexDirection: "column", gap: 16, width: "33%" }}>
            <h2 className="conference_title">Southwest Division</h2>
            <TeamCard
              teamId={nbaTeamIds[6]}
              name={"Dallas Mavericks"}
              abv={"dal"}
            />
            <TeamCard
              teamId={nbaTeamIds[10]}
              name={"Houston Rockets"}
              abv={"hou"}
            />
            <TeamCard
              teamId={nbaTeamIds[14]}
              name={"Memphis Grizzlies"}
              abv={"mem"}
            />
            <TeamCard
              teamId={nbaTeamIds[18]}
              name={"New Orleans Pelicans"}
              abv={"nop"}
            />
            <TeamCard
              teamId={nbaTeamIds[26]}
              name={"San Antonio Spurs"}
              abv={"sas"}
            />
          </div>
        </>
    }
    </section>
    </>
  );
}
