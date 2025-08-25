import { Link } from "react-router-dom";

export default function TeamCard({ teamId, name, abv, className = "" }) {
  const src = abv ? `https://raw.githubusercontent.com/gtkacz/nba-logo-api/main/icons/${abv.toLowerCase()}.svg` : undefined

  return (
    <Link
      to={`/team/${teamId}`}
      className={`team_card`}
    >
      <img
        src={src}
        alt={name ? `${name} logo` : "team logo"}
        loading="lazy"
        style={{ width: 56, height: 56, objectFit: "contain", flexShrink: 0 }}
        className="team_card_logo"
      />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }} className="team_card_body">
        <div style={{ fontWeight: 700, fontSize: "1rem" }} className="team_card_name">{name}</div>
      </div>
    </Link>
  );
}