
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
                <strong>{props.team}</strong><br />
                {props.draftInfo} <br />
                <strong>Points per game:</strong> {props.ppg} <br />
                <strong>Assists per game:</strong> {props.apg} <br />
                <strong>Rebounds per game:</strong> {props.rpg} <br />
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
              <strong>Owner:</strong> {props.owner} <br />
              <strong>General Manager:</strong> {props.generalManager} <br />
              <strong>Head Coach:</strong> {props.headCoach} <br />
              <strong>Arena:</strong> {props.arena} <br />
              <strong>Year Founded:</strong> {props.yearFounded} <br />
            </div>
          </div>
          </>
        )}
      </article>
    </div>
  )
}