import { Link } from "react-router-dom";

export default function InfoCard(props) {

    const bio = {
        "Birthdate": props.birthdate ?? "N/A",
        "Country": props.country ?? "N/A",
        "School": props.school ?? "N/A",
        "Height": props.height ?? "N/A",
        "Weight": props.weight ?? "N/A",
        "Exp": props.exp ?? "N/A",
        "Team": props.team ?? "N/A",
        "Draft": props.draftInfo ?? "N/A",
        "Championships": props.rings ?? "N/A",
        "MVP": props.mvp ?? "N/A",
        "All-NBA": props.allNba ?? "N/A",
        "All-Star": props.allStar ?? "N/A"
    }

    const seasonStats = {
        "Age": props.age ?? "N/A",
        "GP": props.gp ?? "N/A",
        "FGM": props.fgm ?? "N/A",
        "FGA": props.fga ?? "N/A",
        "Record": props.record ?? "N/A",
        "FG%": props.fgPct ?? "N/A",
        "3P%": props.threePct ?? "N/A",
        "FT%": props.ftPct ?? "N/A",
        "PTS": props.pts ?? "N/A",
        "REB": props.reb ?? "N/A",
        "AST": props.ast ?? "N/A",
        "STL": props.stl ?? "N/A",
        "BLK": props.blk ?? "N/A",
        "TOV": props.tov ?? "N/A",
        "Plus/Minus": props.plusMinus ?? "N/A",
        "Fantasy Points": props.fantasy ?? "N/A"
    }

    const teamInfo = {
        "Owner": props.owner ?? "N/A",
        "GM": props.generalManager ?? "N/A",
        "Head Coach": props.headCoach ?? "N/A",
        "Founded": props.yearFounded ?? "N/A",
        "Arena": props.arena ?? "N/A",
        "G-League": props.gleague ?? "N/A",
        "Championships": props.championships ?? "N/A"
    }

    const franchiseLeaders = {
        "Points": props.pts,
        "Rebounds": props.reb,
        "Assists": props.ast,
        "Blocks": props.blk,
        "Steals": props.stl
    }

    function renderFranchiseLeaders(cat) {
        if(cat == "Points"){
            return (
                <Link to={`/players/${props.ptsId}`} style={{ textDecoration: "none", color: "#0a66c2"}}>{props.ptsName} - {props.pts}</Link>
            )
        }
        else if(cat == "Rebounds"){
            return (
                <Link to={`/players/${props.rebId}`} style={{ textDecoration: "none", color: "#0a66c2"}}>{props.rebName} - {props.reb}</Link>
            )
        }
        else if(cat == "Assists"){
            return (
                <Link to={`/players/${props.astId}`} style={{ textDecoration: "none", color: "#0a66c2"}}>{props.astName} - {props.ast}</Link>
            )
        }
        else if(cat == "Blocks"){
            return (
                <Link to={`/players/${props.blkId}`} style={{ textDecoration: "none", color: "#0a66c2"}}>{props.blkName} - {props.blk}</Link>
            )
        }
        else if(cat == "Steals"){
            return (
                <Link to={`/players/${props.stlId}`} style={{ textDecoration: "none", color: "#0a66c2"}}>{props.stlName} - {props.stl}</Link>
            )
        }
    }

    return (
        <div className="info_card_wrapper">
            <article className="info_card">
                <div className="info_card_header">{props.title} {props.cardType === "bio" ? " (" + props.position + " / #" + props.jersey + ")" : null}</div>
                <div className="info_card_body">
                    {props.image && props.cardType=="bio" && <img src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${props.playerId}.png`} alt={props.title} className="info_card_img" />}
                    {props.image && props.cardType=="teamInfo" && <img src={`https://raw.githubusercontent.com/gtkacz/nba-logo-api/main/icons/${props.abv}.svg`} alt={props.title} className="info_card_img" />}
                    
                    {
                    props.categories.map((cat) => {
                        if(cat == "Team"){
                            return(
                                <div className="info_card_stats" key={props.teamId+props.ast+props.tov*props.age}>
                                    <p className="stat">
                                        <Link to={`/team/${props.teamId}`} style={{ textDecoration: "none"}} >{bio[cat]}</Link>
                                    </p>
                                    <p className="cat">{cat}</p>
                                </div>
                            )
                        }else{
                            return(
                                <div className="info_card_stats" key={cat}>
                                    {props.cardType == "bio" && <p className="stat">{bio[cat]}</p>}
                                    {props.cardType == "season" && <p className="stat">{seasonStats[cat]}</p>}
                                    {props.cardType == "teamInfo" && <p className="stat">{teamInfo[cat]}</p>}
                                    {props.cardType == "franchiseLeaders" && <p className="stat">{renderFranchiseLeaders(cat)}</p>}

                                    <p className="cat">{cat}</p>
                                </div>
                            )
                        }
                    })
                    }

                    
                </div>
            </article>
        </div>
    )
}
