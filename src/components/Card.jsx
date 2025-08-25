
//Player/Team card component
export default function Card(props) {

  const playerId = props.id;
  const headshotUrl = `https://cdn.nba.com/headshots/nba/latest/1040x760/${playerId}.png`; //from official nba cdn

  const teamUrl = `https://raw.githubusercontent.com/gtkacz/nba-logo-api/main/icons/${props.abv}.svg`;//team logo from nba logo api
  return (
    <div className="card_wrapper">
      <h2 className="card_header">{props.title}</h2>
      <article className="card" role="article">
        {props.title === "Player of the Day" ? (
          <>
            {headshotUrl && <img src={headshotUrl} alt={props.name} className="card_img" />}
            <div className="card_body">
              <h3 className="player_name">{props.name} - ({props.position} / #{props.jersey})</h3>
              <p className="season">{props.season}</p>
              <div className="stats">
                {props.team} <br />
                {props.draftInfo} <br />
                Points per game: {props.ppg} <br />
                Assists per game: {props.apg} <br />
                Rebounds per game: {props.rpg} <br />
              </div>
            </div>
          </>
        ) : (
          <>
          {teamUrl && <img src={teamUrl} alt={props.name} className="card_img_team" />}
          <div className="card_body">
            <h3 className="team_name">{props.name}</h3>
            <p className="gleague">G League: {props.gleague}</p>
            <div className="stats">
              Owner: {props.owner} <br />
              General Manager: {props.generalManager} <br />
              Head Coach: {props.headCoach} <br />
              Arena: {props.arena} <br />
              Year Founded: {props.yearFounded} <br />
            </div>
          </div>
          </>
        )}
      </article>
    </div>
  )
}