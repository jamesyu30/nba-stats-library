import logo from "../assets/site-logo.jpg" //temp

//Player card component
export default function Card() {
  return (
    <div className="card_wrapper">
      <h2 className="card_header">Player of the Day</h2>
      <article className="card" role="article">
        <img src={logo} alt="title" className="card_img" />
        <div className="card_body">
          <h3 className="player_name">Jalen Brunson - (PG /# 11)</h3>
          <p className="season">25/26 Season</p>
            <div className="stats">
              Points: 20 <br />
              Assists: 5 <br />
              Rebounds: 3 <br />
              Steals: 2 <br />
              Blocks: 1 <br />
              Turnovers: 2 <br />
            </div>
        </div>
      </article>
    </div>
  )
}